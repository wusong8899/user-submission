import { UserSubmissionData } from '../../types';
import m from 'mithril';

interface PaginationState {
  loading: boolean;
  moreResults: boolean;
  items: UserSubmissionData[];
}

interface PaginationActions {
  setLoading: (loading: boolean) => void;
  setMoreResults: (hasMore: boolean) => void;
  addItems: (newItems: UserSubmissionData[]) => void;
  resetItems: () => void;
  hasMoreResults: () => boolean;
  loadMore: (loadFunction: (offset: number) => Promise<UserSubmissionData[]>) => Promise<void>;
}

/**
 * Custom hook for pagination logic
 * Since Flarum doesn't have native hooks, this is implemented as a factory function
 */
export function createPaginationState(): PaginationState & PaginationActions {
  const state: PaginationState = {
    loading: true,
    moreResults: false,
    items: []
  };

  const actions: PaginationActions = {
    setLoading(loading: boolean) {
      state.loading = loading;
      // Don't call m.redraw() here - let the component handle redrawing
    },

    setMoreResults(hasMore: boolean) {
      state.moreResults = hasMore;
    },

    addItems(newItems: UserSubmissionData[]) {
      state.items.push(...newItems);
    },

    resetItems() {
      state.items = [];
    },

    hasMoreResults() {
      return state.moreResults;
    },

    async loadMore(loadFunction: (offset: number) => Promise<UserSubmissionData[]>) {
      if (state.loading) return; // Prevent multiple simultaneous requests
      
      state.loading = true;
      // Don't call m.redraw() immediately - let the natural render cycle handle it
      
      try {
        const results = await loadFunction(state.items.length);
        // Results will be processed by parseResults function
        return results;
      } catch (error) {
        console.error('Error loading more items:', error);
        state.loading = false;
        // Let the component handle the redraw after the promise resolves
        throw error;
      }
    }
  };

  return { ...state, ...actions };
}

/**
 * Parse results helper function
 */
export function parseResults(
  pagination: ReturnType<typeof createPaginationState>,
  results: UserSubmissionData[]
): UserSubmissionData[] {
  // For Flarum store.find() results, the pagination info is usually in the payload
  // Check for pagination links in different possible locations
  let hasMoreResults = false;
  
  // Try different paths where pagination info might be stored
  if (results && typeof results === 'object') {
    const payload = results as any;
    
    // Check for standard JSON:API pagination links
    hasMoreResults = !!(payload.links?.next) || 
                     !!(payload.meta?.hasMore) ||
                     !!(payload.payload?.links?.next) ||
                     // For collections, check if we got a full page
                     (Array.isArray(results) && results.length >= 20); // Assuming 20 is default page size
  }
  
  pagination.setMoreResults(hasMoreResults);
  
  // Handle both array results and wrapped results
  const itemsToAdd = Array.isArray(results) ? results : (results as any).data || [];
  if (itemsToAdd.length > 0) {
    pagination.addItems(itemsToAdd);
  }
  
  pagination.setLoading(false);

  return Array.isArray(results) ? results : itemsToAdd;
}