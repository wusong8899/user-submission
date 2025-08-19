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
      m.redraw();
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
      this.setLoading(true);
      try {
        await loadFunction(state.items.length);
      } catch {
        // Log error silently - could be sent to error service in production
      } finally {
        this.setLoading(false);
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
  pagination.setMoreResults(!!(results as any).payload?.links?.next);
  pagination.addItems(results);
  pagination.setLoading(false);

  return results;
}