export interface AuthorImage {
    url: string;
}

export interface Author {
    id: number;
    documentId: string;
    authorName: string;
    authorDescription: string;
    authorImage: AuthorImage;
}

export interface CoverImage {
    url: string;
}

export interface Blog {
    id: number;
    documentId: string;
    articleTitle: string;
    blogDescripition: string;
    blogContent: any;
    coverImage: CoverImage;
    author: Author;
}

export interface FetchResponse {
    data: Blog[];
}

export interface BlogsProps {
    blogs: {
        data: Blog[];
    };
    blogId?: number;
}

export interface BlogContentProps {
    blog: Blog | null;
}
