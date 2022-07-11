
import * as DeckTypings from "@danmarshall/deckgl-typings"
import * as EsriDeckTypings from "@danmarshall/deckgl-typings/deck.gl__arcgis"
declare module "deck.gl" {
    export namespace DeckTypings {}
}
declare module "deck.gl/@arcgis" {
    export namespace EsriDeckTypings {}
}

