import { services } from "./BaseService";

export class AuthService {

    static async userLogin(credential: any) {
        return await services("user/login", "post", credential);
    }

    static async createMovie(credential: any) {
        return await services("movie", "post", credential);
    }

    static async getMovies() {
        return await services("movie", "get");
    }

    static async updateMovie(id: string, formData: any) {
        return await services(`movie/${id}`, "put", formData)
    }

    static async getMovieById(id: string) {
        return await services(`movie/${id}`, "get")
    }

    static async deleteMovie(id: string) {
        return await services(`movie/${id}`, "delete")
    }
}