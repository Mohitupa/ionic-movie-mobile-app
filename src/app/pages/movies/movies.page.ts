import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { LoadingController } from '@ionic/angular';
import { environment } from './../../../environments/environment';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.page.html',
    styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
    movies: any[] = [];
    currentPage = 1;
    imageBaseUrl = environment.images;

    constructor(
        private movieService: MovieService,
        private loadingCtrl:LoadingController
    ) { }

    ngOnInit() {
        this.loadMovies();
    }

    async loadMovies(event?:any) {

        const loading = await this.loadingCtrl.create({
            message: 'Loading..',
            spinner: 'bubbles',
        })
        await loading.present();

        this.movieService.getTopRatedMovies(this.currentPage).subscribe((res: any) => {
            loading.dismiss();
            this.movies.push(...res.results);
            event?.target.complete();
            if(event) {
                event.target.disabled = res.total_pages == this.currentPage;
            }
        })
    }

    loadMore(event: any) {
        this.currentPage++;
        this.loadMovies(event);
    }

}
