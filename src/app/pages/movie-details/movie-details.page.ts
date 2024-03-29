import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { environment } from './../../../environments/environment';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.page.html',
    styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

    movie: any;
    imageBaseUrl = environment.images;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService
    ) { }

    ngOnInit() {
        const id: any = this.route.snapshot.paramMap.get('id');
        this.movieService.getMovieDetails(id).subscribe(res => {
            this.movie = res;
        })
    }

    openHomePage() {
        window.open(this.movie.homepage)
    }
}
