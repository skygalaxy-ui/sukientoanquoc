/**
 * Database module — Central exports for all DB operations.
 * 
 * Usage:
 *   import { supabase } from '@/lib/db';
 *   import { getPosts, getPostBySlug } from '@/lib/db';
 *   import { getCategories, createCategory } from '@/lib/db';
 */

// Client
export { supabase } from './client';

// Posts
export {
    getPosts,
    getPostById,
    getPublishedPosts,
    getPostBySlug,
    getRelatedPosts,
    createPost,
    updatePost,
    deletePost,
    restorePost,
    permanentDeletePost,
    duplicatePost,
    checkAndPublishScheduledPosts,
} from './posts';

// Categories
export {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from './categories';

// Tags
export {
    getTags,
    createTag,
    updateTag,
    deleteTag,
} from './tags';

// Media
export {
    uploadImage,
    listStorageImages,
    deleteStorageImage,
} from './media';

// Settings & Content
export {
    getSiteSettings,
    saveSiteSetting,
    getScheduledContent,
    createScheduledContent,
    updateScheduledContent,
    deleteScheduledContent,
    getAllPageContent,
    savePageContent,
    getIntegrationSettings,
} from './settings';

export type { IntegrationSettings } from './settings';
