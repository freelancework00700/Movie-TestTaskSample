export interface LoginUser {
    email: string;
    password: string;
}

export interface CreateMovieList {
    image: File | null;
    title: string;
    publishing_year: string;
}

export interface MovieList {
    id: string;
    title: string;
    publishing_year: number;
    media_id: string;
    user_id: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        is_deleted: boolean;
        createdAt: string;
        updatedAt: string;
    },
    media: {
        id: string;
        filename: string;
        sys_filename: string;
        size: string;
        extension: string;
        is_deleted: boolean;
        createdAt: string;
        updatedAt: string;
    }
}
