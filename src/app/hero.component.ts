import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from './hero/hero';
import { HeroService } from './services/hero.service';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  /**
   * The providers array tells Angular to create a fresh instance of the HeroService when it creates a new AppComponent.
   * The AppComponent can use that service to get heroes and so can every child component of its component tree.
   */
  providers: [HeroService]

})
export class HeroesComponent implements OnInit {
  heroes:Hero[];
  selectedHero:Hero;

  constructor(private router:Router,
              private heroService:HeroService) {
  }

  ngOnInit():void {
    this.getHeroes();
  }

  onSelect(hero:Hero):void {
    this.selectedHero = hero;
  }

  getHeroes():void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail():void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name:string):void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero:Hero):void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }


}



