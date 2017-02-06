import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { HeroService } from '../services/hero.service';
import { Hero } from '../hero/hero';

@Component({
  moduleId: module.id,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero: Hero;

  constructor(private heroService:HeroService,
              private route:ActivatedRoute,
              private location:Location) {
  }

  ngOnInit():void {
    this.route.params
      .switchMap((params:Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  goBack():void {
    this.location.back();
  }

  save():void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }


}

