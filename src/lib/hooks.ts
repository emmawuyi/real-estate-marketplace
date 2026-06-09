import useSWR from 'swr';
import { supabase } from './supabase';

// Fetcher function for SWR
const fetcher = async (query: () => Promise<any>) => {
  const { data, error } = await query();
  if (error) throw error;
  return data;
};

// Listings hooks
export function useListings(filters?: {
  search?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  beds?: number;
  baths?: number;
  type?: string;
}) {
  const key = ['listings', JSON.stringify(filters)];

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    fetcher(async () => {
      let query = supabase
        .from('properties')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,location.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        );
      }
      if (filters?.category) query = query.eq('category', filters.category);
      if (filters?.priceMin) query = query.gte('price', filters.priceMin);
      if (filters?.priceMax) query = query.lte('price', filters.priceMax);
      if (filters?.beds) query = query.eq('beds', filters.beds);
      if (filters?.baths) query = query.eq('baths', filters.baths);
      if (filters?.type) query = query.eq('type', filters.type);

      return query;
    })
  );

  return { listings: data || [], error, isLoading, mutate };
}

export function useListing(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ['listing', id] : null,
    () =>
      fetcher(async () =>
        supabase.from('properties').select('*').eq('id', id).single()
      )
  );

  return { listing: data, error, isLoading, mutate };
}

export function useUserListings(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? ['user-listings', userId] : null,
    () =>
      fetcher(async () =>
        supabase
          .from('properties')
          .select('*')
          .or(`agent_id.eq.${userId},agency_id.eq.${userId}`)
          .order('created_at', { ascending: false })
      )
  );

  return { listings: data || [], error, isLoading, mutate };
}

// Feed hooks
export function useFeedPosts() {
  const { data, error, isLoading, mutate } = useSWR(['feed-posts'], () =>
    fetcher(async () =>
      supabase
        .from('feed_posts')
        .select('*')
        .order('created_at', { ascending: false })
    )
  );

  return { posts: data || [], error, isLoading, mutate };
}

export function useFeedPost(postId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    postId ? ['feed-post', postId] : null,
    () =>
      fetcher(async () =>
        supabase
          .from('feed_posts')
          .select('*')
          .eq('id', postId)
          .single()
      )
  );

  return { post: data, error, isLoading, mutate };
}

export function usePostComments(postId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    postId ? ['post-comments', postId] : null,
    () =>
      fetcher(async () =>
        supabase
          .from('post_comments')
          .select('*')
          .eq('post_id', postId)
          .order('created_at', { ascending: false })
      )
  );

  return { comments: data || [], error, isLoading, mutate };
}

export function usePostLikes(postId: string, userId?: string) {
  const { data: likes, error: likesError } = useSWR(
    postId ? ['post-likes-count', postId] : null,
    () =>
      fetcher(async () =>
        supabase.from('post_likes').select('count', { count: 'exact' }).eq('post_id', postId)
      )
  );

  const { data: hasLiked } = useSWR(
    postId && userId ? ['post-liked', postId, userId] : null,
    () =>
      fetcher(async () =>
        supabase
          .from('post_likes')
          .select('*', { count: 'exact' })
          .eq('post_id', postId)
          .eq('user_id', userId)
      )
  );

  return {
    likesCount: likes?.[0]?.count || 0,
    hasLiked: (hasLiked?.length || 0) > 0,
    error: likesError,
  };
}

export function useUserSavedPosts(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? ['user-saved-posts', userId] : null,
    () =>
      fetcher(async () =>
        supabase
          .from('post_saves')
          .select('post_id')
          .eq('user_id', userId)
      )
  );

  return { savedPostIds: (data || []).map((row) => row.post_id), error, isLoading, mutate };
}

// Leads hooks
export function useLeads(filter?: 'all' | 'new' | 'assigned' | 'contacted') {
  const { data, error, isLoading, mutate } = useSWR(
    ['leads', filter],
    () =>
      fetcher(async () => {
        let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (filter && filter !== 'all') query = query.eq('status', filter);
        return query;
      })
  );

  return { leads: data || [], error, isLoading, mutate };
}

export function useLeadsByAgent(agentId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    agentId ? ['agent-leads', agentId] : null,
    () =>
      fetcher(async () =>
        supabase
          .from('leads')
          .select('*')
          .eq('assigned_agent_id', agentId)
          .order('sla_deadline', { ascending: true })
      )
  );

  return { leads: data || [], error, isLoading, mutate };
}

export function useLead(leadId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    leadId ? ['lead', leadId] : null,
    () =>
      fetcher(async () =>
        supabase.from('leads').select('*').eq('id', leadId).single()
      )
  );

  return { lead: data, error, isLoading, mutate };
}

export function useLeadInteractions(leadId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    leadId ? ['lead-interactions', leadId] : null,
    () =>
      fetcher(async () =>
        supabase
          .from('lead_interactions')
          .select('*')
          .eq('lead_id', leadId)
          .order('created_at', { ascending: false })
      )
  );

  return { interactions: data || [], error, isLoading, mutate };
}

// Moderation hooks
export function useModerationQueue() {
  const { data, error, isLoading, mutate } = useSWR(['moderation-queue'], () =>
    fetcher(async () =>
      supabase
        .from('moderation_items')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true })
    )
  );

  return { items: data || [], error, isLoading, mutate };
}

// Saved properties hooks
export function useSavedProperties(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? ['saved-properties', userId] : null,
    () =>
      fetcher(async () =>
        supabase
          .from('saved_properties')
          .select('property_id')
          .eq('user_id', userId)
      )
  );

  return { propertyIds: (data || []).map((row) => row.property_id), error, isLoading, mutate };
}

// Profiles hook
export function useProfile(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? ['profile', userId] : null,
    () =>
      fetcher(async () =>
        supabase.from('profiles').select('*').eq('id', userId).single()
      )
  );

  return { profile: data, error, isLoading, mutate };
}
