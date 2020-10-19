import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { EssentialOil, Maux, News, Recettes, VegetalOil } from 'src/app/models/config';
import { compareOil } from 'src/app/tools/compare-oil';
import { findOilsInRecettes } from 'src/app/tools/find-oils-in-recettes';
import { ConfigService } from '../config/config.service';
import { ListsOilsService } from '../lists-oils.service';

@Injectable({
  providedIn: 'root'
})
export class CreateDatasService {

  private datas: BehaviorSubject<any> = new BehaviorSubject(undefined);
  vegetalOils: Observable<VegetalOil[]>;
  essentialOils: Observable<EssentialOil[]>;
  news: Observable<News[]>;
  recettes: Observable<Recettes[]>;
  maux: Observable<Maux[]>;

  constructor(
    private configService: ConfigService,
  ) {
    /*this.vegetalOils = this.getDatasCache().pipe(
      filter((datas, index) => {
        console.log( datas.huiles[index].isEssential ? datas.huiles[index].code.search('vegetale') : 'ca marche pas');
        return datas.huiles[index].isEssential === false;
      }),
      map((data) => {
        console.log('data après filter', data.huiles);
        return data.huiles;
      })
    );*/

    this.vegetalOils = this.getDatasCache().pipe(
      map((datas) => {
        console.log('Données avant transformation -->', datas);
        const tmpOil =  datas.huiles.filter((huile: any) => {
          return !huile.isEssential;
        });
        return tmpOil.map((huile: any) => {
          return new VegetalOil(
            huile.fields.h_essence_principale,
            huile.id,
            huile.isEssential,
            huile.fields.medias.lien_huiles_media[0],
            huile.fields.medias.image_flacon_huile[0],
            huile.fields.h_color_borne,
            huile.fields.h_historique_generalites,
            huile.fields.h_propriete_principale,
            huile.fields.h_contre_indication,
            huile.fields.h_femme_enceinte.code === 'oui',
            huile.fields.h_limite_age.code !== 'no_limit' ? huile.fields.h_limite_age.label : undefined,
            );
        }).sort(compareOil);
      })
    );
    this.essentialOils = this.getDatasCache().pipe(
      map((datas) => {
        const tmpDatas =  datas.huiles.filter((huile: any) => {
          return huile.isEssential;
        });
        return tmpDatas.map((huile: any) => {
          return new EssentialOil(
            huile.fields.h_essence_principale,
            huile.id,
            huile.isEssential,
            huile.fields.medias.lien_huiles_media[0],
            huile.fields.medias.image_flacon_huile[0],
            huile.fields.h_color_borne,
            huile.fields.h_bienfaits,
            huile.fields.h_historique_generalites,
            huile.fields.h_nom_latin,
            huile.fields.h_provenance,
            huile.fields.h_partie_utilisee,
            huile.fields.h_principaux_composants_molecules,
            huile.fields.h_propriete_principale,
            '',
            huile.fields.h_contre_indication,
            huile.fields.h_le_saviez_vous,
            {
              cutanee: huile.fields.h_compatible_voie_cutanee.code === 'yes' ? huile.fields.h_posologie_cutanee : undefined,
              diffusion: huile.fields.h_compatible_voie_diffusion.code === 'yes' ? huile.fields.h_posologie_diffusion : undefined,
              orale: huile.fields.h_compatible_voie_orale.code === 'yes' ? huile.fields.h_posologie_orale : undefined,
              respiratoire: huile.fields.h_compatible_voie_respiratoire.code === 'yes' ? huile.fields.h_posologie_respiratoire : undefined,
            },
            huile.fields.h_femme_enceinte.code === 'oui',
            huile.fields.h_limite_age.code !== 'no_limit' ? huile.fields.h_limite_age.label : undefined,
            );
        }).sort(compareOil);
      })
    );
    this.news = this.getDatasCache().pipe(
      map((datas) => {
        const tmpNews = datas.news;
        return tmpNews.map((newData) => {
          return new News(
            newData.code,
            newData.id,
            newData.fields.medias.image_news[0],
            newData.fields.news_name,
            newData.fields.n_mot_cle_sous_titre,
            newData.fields.n_description
            );
        });
      })
    );
    this.recettes = this.getDatasCache().pipe(
      map((datas) => {
        const tmpRecettes = datas.recettes;
        return tmpRecettes.map((recette) => {
          return new Recettes(
            recette.fields.recette_huile_name,
            recette.id,
            recette.fields.huiles
            );
        });
      })
    );
    this.maux = this.getDatasCache().pipe(
      map((datas) => {
        const tmpMaux = datas.maux;
        return tmpMaux.map((mauxData) => {
          return new Maux(
            mauxData.fields.maux_name,
            mauxData.id,
            mauxData.fields.recettes
            );
        });
      })
    );
  }

  getDatasCache() {
    return this.datas.asObservable().pipe(
      filter((datas) => {
        return datas !== undefined;
      }),
      take(1)
    );
  }

  createCache() {
    this.configService.getDatas().subscribe((datas) => {
      this.datas.next(datas);
    });
  }

  getVegetalOil(id: string): Observable<VegetalOil> {
    return this.vegetalOils.pipe(
      map((datas) => {
        return datas.find((data) => {
          return '' + data.id === id;
        });
      })
    );
  }

  getEssentialOil(id: string): Observable<EssentialOil> {
    return this.essentialOils.pipe(
      map((datas) => {
        return datas.find((data) => {
          return '' + data.id === id;
        });
      })
    );
  }

  getMauxOfOil(idOil: number) {
    return this.getDatasCache().pipe(
      map((datas) => {
        const recettes = datas.recettes.filter((recette) => {
          return findOilsInRecettes(idOil, recette);
        });
        /*
        return recettes.map(recette => {
          const malSource = datas.maux.find(mal => mal.id === recette.fields.maux[0].id);
          return new Maux(
            malSource.fields.maux_name,
            malSource.id,
            malSource.fields.recettes,
          );
        });
        */
        console.log(recettes);
        const maux = datas.maux.filter((mal) => {
          const recetteFound = recettes.find((recette) => {
            const malFound = recette.fields.maux.find((idMaux) => {
              return idMaux.id === mal.id;
            });
            return !!malFound;
          });
          return !!recetteFound;
        });
        console.log(maux);
        return maux.map((mal) => {
          return new Maux(
            mal.fields.maux_name,
            mal.id,
            mal.fields.recettes
          );
        });
      })
    );
    /*
    return this.getDatasCache().pipe(
      map((datas) => {
        const maux = datas.maux;
        const recettes = datas.recettes;
        console.log('avant de passer dans le premier return', datas);
        return maux.map((mal) => {
          console.log('DEBUG', mal);
          return mal.fields.recettes.find((recette, index) => {
            console.log('!!! Recettes', recette.id);
            return recette.id === idOil;
          });
        });
      })
    );
    */
  }

  getNews(): Observable<News[]> {
    return this.news;
  }

  getRecettes(): Observable<Recettes[]> {
    return this.recettes;
  }
}
