export function findOilsInRecettes(idOil: number, recette: any): boolean {

    const huileFound = recette.fields.huiles.find((huile) => {
        return huile.id === idOil;
      });
    const huileMultiFound = recette.fields.huiles_multi.find((huileMulti) => {
        return huileMulti.id === idOil;
      });
    return huileFound || huileMultiFound;
}
