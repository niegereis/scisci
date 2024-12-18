
export interface Author {
    id: number;
    authorName: string;
    authorImage: { url: string };
    authorDescription: string;
}

export interface Blog {
    id: number;
    coverImage: { url: string };
    articleTitle: string;
    blogDescripition: string;
    blogContent: any;
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
