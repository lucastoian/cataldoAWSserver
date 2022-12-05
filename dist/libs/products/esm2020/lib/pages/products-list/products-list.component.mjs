import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { Product123 } from '../../models/product123';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/products.service";
import * as i2 from "../../services/categories.service";
import * as i3 from "@angular/router";
import * as i4 from "primeng/multiselect";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/paginator";
import * as i7 from "@angular/common";
import * as i8 from "../../components/product-item/product-item.component";
const _c0 = ["paginator"];
function ProductsListComponent_div_32_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "eshop-frontend-product-item", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const product_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("product", product_r2);
} }
function ProductsListComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtemplate(1, ProductsListComponent_div_32_div_1_Template, 2, 1, "div", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.productOnThisPage);
} }
const _c1 = function () { return { "width": "100%" }; };
const _c2 = function () { return { "width": "400px" }; };
export class ProductsListComponent {
    constructor(productsService, catService, route) {
        this.productsService = productsService;
        this.catService = catService;
        this.route = route;
        this.isChecked = false;
        this.products = [];
        this.categories = [];
        this.binaryProp = true;
        this.selectedCategories = [];
        this.sex = "";
        this.productOnThisPage = [];
        this.wProds = [];
        this.filteredProducts = [];
        this.first = 0;
        this.categoryMap = new Map();
        this.currentCategory = { name: "luca", code: "ok" };
        this.categoryMap.set("61ab7dbaf6364e38a5b6297b", "Camicie");
        this.categoryMap.set("camice", "61ab7dbaf6364e38a5b6297b");
        this.categoryMap.set("61abf4a257450fc2517488f0", "Polo");
        this.categoryMap.set("61b631af0d7e33d82b524c10", "Pantaloni");
        this.categoryMap.set("61bdddff2ddc4a8c13df4a17", "Giacche");
        this.categoryMap.set("61bdf809872350f840c8979d", "Felpe");
        this.categoryMap.set("61e1a62d81572bb64bd8d73b", "Maglioni");
        this.categoryMap.set("61e7cdc42eedad9135296d50", "Gilet");
        this.categoryMap.set("624ac34e9a3fb4d0bf04edd2", "Sneakers");
        this.categoryMap.set("624ac784503abba399845265", "T-shirt");
        this.categoryMap.set("t-shirt ml", "624ac784503abba399845265");
        this.categoryMap.set("624ac7f7503abba39984526d", "Giubbotti");
        this.categoryMap.set("giubbotto", "624ac7f7503abba39984526d");
        this.categoryMap.set("632eb741544addd6ea6c2bdd", "Cinture");
        this.categoryMap.set("632eb754544addd6ea6c2be0", "Scarpe");
        this.categoryMap.set("bermuda", "");
        this.categoryMap.set("632eb762544addd6ea6c2be3", "Jeans");
        this.sesso = [{ name: 'Uomo', code: 'M' }, { name: 'Donna', code: 'F' }];
        this.categoria = [{ name: 'Camicie', code: 'camicie' }, { name: 'Polo', code: 'polo' }, { name: 'Pantaloni', code: 'pantaloni' }, { name: 'Felpe', code: 'felpe' }, { name: 'Maglioni', code: 'maglioni' }, { name: 'Gilet', code: 'gilet' }, { name: 'Sneakers', code: 'sneakers' }, { name: 'T-shirt', code: 't-shirt' }, { name: 'Giubbotti', code: 'giubbotti' }, { name: 'Cinture', code: 'cinture' }, { name: 'Scarpe', code: 'scarpe' }, { name: 'Jeans', code: 'jeans' },];
        this.brand = [{ name: 'Blauer', code: 'blauer' }, { name: 'Old River', code: 'old river' }, { name: 'Colmar', code: 'colmar' }, { name: 'EA7', code: 'ea7' }, { name: 'Kway', code: 'kway' }, { name: 'Lacoste', code: 'lacoste' }, { name: 'Barbour', code: 'barbour' }, { name: 'Ciesse', code: 'ciesse' }, { name: 'Husky', code: 'husky' }, { name: 'Canadiens', code: 'canadiens' }];
        this.taglia = [{ name: '37', code: '37' }, { name: '38', code: '38' }, { name: '39', code: '39' }, { name: '40', code: '40' }, { name: '41', code: '41' }, { name: '42', code: '42' }, { name: '43', code: '43' }, { name: '44', code: '44' }, { name: '45', code: '45' }, { name: '46', code: '46' }, { name: 'XXS', code: 'xxs' }, { name: 'XS', code: 'xs' }, { name: 'S', code: 's' }, { name: 'M', code: 'm' }, { name: 'L', code: 'l' }, { name: 'XL', code: 'xl' }, { name: 'XXL', code: 'xxl' }, { name: 'XXXL', code: 'xxxl' }];
    }
    ngOnInit() {
        this.selectedSex = [];
        this.selectedCategoria = [];
        this.url = this.route.url;
        this._urlSegment = this.url.value[0].path;
        console.log(this._urlSegment);
        this.route.params.subscribe((params) => {
            this.categoryId = params.categoryid;
            console.log("category id = " + this.categoryId);
            this._getProducts();
            this.currentCategory.name = this.categoryMap.get(this.categoryId);
            let nmm = this.currentCategory.name;
            let cdd = "";
            this.categoria.forEach(function (element) {
                if (element.name == nmm) {
                    cdd = element.code;
                }
            });
            if (nmm != null) {
                this.selectedCategoria.push({ name: nmm, code: cdd });
            }
            else {
                this.currentCategory.name = "Ricerca Personalizzata";
            }
            console.log(JSON.stringify(this.selectedCategories));
            this.currentCategory.code = cdd;
            console.log("nome della categoria = " + this.currentCategory.name);
            console.log("code della categoria = " + this.currentCategory.code);
        });
        let storedSex = localStorage.getItem("categoria");
        if (storedSex == "uomo")
            this.selectedSex.push({ name: 'Uomo', code: 'M' });
        if (storedSex == "donna")
            this.selectedSex.push({ name: 'Donna', code: 'F' });
    }
    changePage(event) {
        console.log(" change page cerco tra questo indice : " + ((event.page * 10)) + " e questo " + ((event.page + 1) * 10) + " current page = " + this.currentPage);
        this.productOnThisPage = this.products.slice((event.page * 10), ((event.page + 1) * 10));
    }
    search(event) {
        let sesso23;
        sesso23 = [];
        if (this.selectedSex) {
            for (let i = 0; i < this.selectedSex.length; i++) {
                sesso23.push(this.selectedSex[i].code);
            }
        }
        console.log(sesso23);
        let categorie;
        categorie = [];
        if (this.selectedCategoria) {
            for (let i = 0; i < this.selectedCategoria.length; i++) {
                categorie.push(this.selectedCategoria[i].code);
            }
        }
        let brand;
        brand = [];
        if (this.selectedBrand) {
            for (let i = 0; i < this.selectedBrand.length; i++) {
                brand.push(this.selectedBrand[i].code);
            }
        }
        let taglie;
        taglie = [];
        if (this.selectedTaglia) {
            for (let i = 0; i < this.selectedTaglia.length; i++) {
                taglie.push(this.selectedTaglia[i].code);
            }
        }
        console.log("Sesso = " + sesso23 + " categorie = " + categorie);
        this.productsService.getFilteredProducts(brand, categorie, sesso23, taglie).subscribe((products) => {
            this.products = products;
            for (let i = 0; i < this.products.length - 1; i++) {
                if (this.products[i].productId == this.products[i + 1].productId) {
                    for (let y = i; y < this.products.length - 1; y++) {
                        if (this.products[y].productId == this.products[y + 1].productId) {
                            continue;
                        }
                        else {
                            this.products.splice(i, y - i);
                            break;
                        }
                    }
                }
            }
            console.log("ho trovato questi products : " + products);
            this.productOnThisPage = this.products.slice(0, 10);
            this.filteredProducts = products;
            //  setTimeout(() => this.paginator.changePage(1));
            this.first = 0;
        });
    }
    _getProducts() {
        this.selectedCategories.push(this.categoryId);
        console.log("faccio la richiesta get products");
        switch (localStorage.getItem("categoria")) {
            case "uomo":
                this.sex = "M";
                break;
            case "donna":
                this.sex = "F";
                break;
            default:
            // code block
        }
        if (this.selectedCategories[0] != null) {
            this.productsService.getFilteredProducts(null, this.selectedCategories, [this.sex], null).subscribe((products) => {
                this.products = products;
                for (let i = 0; i < this.products.length - 1; i++) {
                    if (this.products[i].productId == this.products[i + 1].productId) {
                        for (let y = i; y < this.products.length - 1; y++) {
                            if (this.products[y].productId == this.products[y + 1].productId) {
                                continue;
                            }
                            else {
                                this.products.splice(i, y - i);
                                break;
                            }
                        }
                    }
                }
                //  this.shuffleArray(this.products);
                this.productOnThisPage = this.products.slice(0, 10);
            });
        }
        else {
            this.productsService.getFilteredProducts(null, null, [this.sex], null).subscribe((products) => {
                this.products = products;
                for (let i = 0; i < this.products.length - 1; i++) {
                    if (this.products[i].productId == this.products[i + 1].productId) {
                        for (let y = i; y < this.products.length - 1; y++) {
                            if (this.products[y].productId == this.products[y + 1].productId) {
                                continue;
                            }
                            else {
                                this.products.splice(i, y - i);
                                break;
                            }
                        }
                    }
                }
                this.productOnThisPage = this.products.slice(0, 10);
                console.log("ho trovato questi prodotti per questa categoria : " + this.products);
            });
        }
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    categoryFilter() {
        this.products = [];
        this.selectedCategories = this.categories.filter((category) => category.checked).map((category) => category.id);
        console.log("categorie = " + this.selectedCategories);
        this.productsService.getFilteredProducts(null, this.selectedCategories, [this.sex]).subscribe((products) => {
            this.products = products;
        });
    }
}
ProductsListComponent.ɵfac = function ProductsListComponent_Factory(t) { return new (t || ProductsListComponent)(i0.ɵɵdirectiveInject(i1.ProductsService), i0.ɵɵdirectiveInject(i2.CategoriesService), i0.ɵɵdirectiveInject(i3.ActivatedRoute)); };
ProductsListComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProductsListComponent, selectors: [["eshop-frontend-products-list"]], viewQuery: function ProductsListComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.paginator = _t.first);
    } }, inputs: { product: "product" }, decls: 33, vars: 33, consts: [[1, "grid", 2, "justify-content", "center"], [1, "row", "filters"], [1, "col-12", "d-flex", 2, "justify-content", "center"], [1, "grid", "w-100"], [1, "row", "w-100"], [1, "col-12", 2, "height", "240px", "background-image", "url(https://sciuti.it/immagini/copertine/colmar-piumini-ai17-desktop.jpg)", "background-repeat", "no-repeat", "background-size", "cover"], [1, "col-12", 2, "font-size", "29px", "letter-spacing", "2px", "font-weight", "900"], [1, "col-12", "PDLdescription", 2, "max-height", "140px", "overflow-y", "auto"], ["id", "filtri", 1, "row", "w-100"], [1, "col-md-4", "col-6"], [1, "m-0", 2, "color", "rgb(52, 52, 52)", "letter-spacing", "2px", "font-weight", "700"], ["defaultLabel", "Genere", "optionLabel", "name", "display", "chip", 3, "options", "ngModel", "panelStyle", "onChange", "ngModelChange"], ["defaultLabel", "Categoria", "optionLabel", "name", "display", "chip", 3, "options", "ngModel", "panelStyle", "onChange", "ngModelChange"], ["defaultLabel", "Brand", "optionLabel", "name", "display", "chip", 3, "options", "ngModel", "panelStyle", "onChange", "ngModelChange"], [1, "col-md-3", "col-6", 2, "display", "none"], ["defaultLabel", "Taglia", "optionLabel", "name", "display", "chip", 3, "options", "ngModel", "panelStyle", "onChange", "ngModelChange"], [1, "row", 2, "justify-content", "center"], [1, "col-12"], [3, "rows", "totalRecords", "first", "onPageChange"], [1, "col-12", "p-1", 2, "max-width", "1300px"], ["class", "grid mobileProdListGrid", "style", "justify-content: center;", 4, "ngIf"], [1, "grid", "mobileProdListGrid", 2, "justify-content", "center"], ["class", "col-auto mobileProdList p-0", 4, "ngFor", "ngForOf"], [1, "col-auto", "mobileProdList", "p-0"], [3, "product"]], template: function ProductsListComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
        i0.ɵɵelement(5, "div", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 4)(7, "div", 6);
        i0.ɵɵtext(8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "div", 7);
        i0.ɵɵtext(10, " Nata a Monza nel 1923, il nome dell\u2019azienda Colmar prende spunto dalle iniziali del suo fondatore Mario Colombo. Specializzata nell\u2019abbigliamento sportivo, l\u2019azienda italiana inizialmente presta maggiore attenzione a quello da sci. Ma \u00E8 nel 2009 che nasce la linea Colmar Original dedicata ai giovani e caratterizzata dallo storico logo vintage, da capi di qualit\u00E0 alla moda urban-lifestyle ma pur sempre d\u2019ispirazione sportiva. ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(11, "div", 8)(12, "div", 9)(13, "p", 10);
        i0.ɵɵtext(14, "Genere");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "p-multiSelect", 11);
        i0.ɵɵlistener("onChange", function ProductsListComponent_Template_p_multiSelect_onChange_15_listener($event) { return ctx.search($event); })("ngModelChange", function ProductsListComponent_Template_p_multiSelect_ngModelChange_15_listener($event) { return ctx.selectedSex = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(16, "div", 9)(17, "p", 10);
        i0.ɵɵtext(18, "Categorie");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "p-multiSelect", 12);
        i0.ɵɵlistener("onChange", function ProductsListComponent_Template_p_multiSelect_onChange_19_listener($event) { return ctx.search($event); })("ngModelChange", function ProductsListComponent_Template_p_multiSelect_ngModelChange_19_listener($event) { return ctx.selectedCategoria = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(20, "div", 9)(21, "p", 10);
        i0.ɵɵtext(22, "Brand");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p-multiSelect", 13);
        i0.ɵɵlistener("onChange", function ProductsListComponent_Template_p_multiSelect_onChange_23_listener($event) { return ctx.search($event); })("ngModelChange", function ProductsListComponent_Template_p_multiSelect_ngModelChange_23_listener($event) { return ctx.selectedBrand = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(24, "div", 14)(25, "p", 10);
        i0.ɵɵtext(26, "Taglie");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "p-multiSelect", 15);
        i0.ɵɵlistener("onChange", function ProductsListComponent_Template_p_multiSelect_onChange_27_listener($event) { return ctx.search($event); })("ngModelChange", function ProductsListComponent_Template_p_multiSelect_ngModelChange_27_listener($event) { return ctx.selectedTaglia = $event; });
        i0.ɵɵelementEnd()()()()()();
        i0.ɵɵelementStart(28, "div", 16)(29, "div", 17)(30, "p-paginator", 18);
        i0.ɵɵlistener("onPageChange", function ProductsListComponent_Template_p_paginator_onPageChange_30_listener($event) { return ctx.changePage($event); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(31, "div", 19);
        i0.ɵɵtemplate(32, ProductsListComponent_div_32_Template, 2, 1, "div", 20);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate1(" ", ctx.currentCategory.name, " ");
        i0.ɵɵadvance(7);
        i0.ɵɵstyleMap(i0.ɵɵpureFunction0(25, _c1));
        i0.ɵɵproperty("options", ctx.sesso)("ngModel", ctx.selectedSex)("panelStyle", i0.ɵɵpureFunction0(26, _c2));
        i0.ɵɵadvance(4);
        i0.ɵɵstyleMap(i0.ɵɵpureFunction0(27, _c1));
        i0.ɵɵproperty("options", ctx.categoria)("ngModel", ctx.selectedCategoria)("panelStyle", i0.ɵɵpureFunction0(28, _c2));
        i0.ɵɵadvance(4);
        i0.ɵɵstyleMap(i0.ɵɵpureFunction0(29, _c1));
        i0.ɵɵproperty("options", ctx.brand)("ngModel", ctx.selectedBrand)("panelStyle", i0.ɵɵpureFunction0(30, _c2));
        i0.ɵɵadvance(4);
        i0.ɵɵstyleMap(i0.ɵɵpureFunction0(31, _c1));
        i0.ɵɵproperty("options", ctx.taglia)("ngModel", ctx.selectedTaglia)("panelStyle", i0.ɵɵpureFunction0(32, _c2));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("rows", 1)("totalRecords", ctx.products.length / 10)("first", ctx.first);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.productOnThisPage);
    } }, directives: [i4.MultiSelect, i5.NgControlStatus, i5.NgModel, i6.Paginator, i7.NgIf, i7.NgForOf, i8.ProductItemComponent], styles: [".filters[_ngcontent-%COMP%]{width:100%}@media screen and (max-width: 516px){.mobileProdList[_ngcontent-%COMP%]{padding:3px}.PDLdescription[_ngcontent-%COMP%]{display:none}}@media screen and (min-width: 516px){.filters[_ngcontent-%COMP%]{width:95%}}@media screen and (min-width: 1500px){.filters[_ngcontent-%COMP%]{width:92%}}@media screen and (min-width: 1850px){.filters[_ngcontent-%COMP%]{width:89%}}@media screen and (min-width: 1950px){.filters[_ngcontent-%COMP%]{width:80%}}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductsListComponent, [{
        type: Component,
        args: [{ selector: 'eshop-frontend-products-list', template: "<script src=\"//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js\"></script>\n\n\n  <div class=\"grid\" style=\"justify-content: center;\">\n    \n    <div class=\"row filters\">\n      <div class=\"col-12 d-flex\" style=\"justify-content: center;\">\n        \n          <div class=\"grid w-100\">\n            <div class=\"row w-100\">\n              <div class=\"col-12\" style=\"height: 240px; background-image: url(https://sciuti.it/immagini/copertine/colmar-piumini-ai17-desktop.jpg); background-repeat: no-repeat; background-size: cover;\">\n               \n              </div>\n            </div>\n            <div class=\"row w-100\">\n              <div class=\"col-12\" style=\"font-size: 29px; letter-spacing:2px; font-weight: 900;\">\n               {{this.currentCategory.name}}\n              </div>\n              <div class=\"col-12 PDLdescription\" style=\"max-height: 140px; overflow-y:auto\">\n                Nata a Monza nel 1923, il nome dell\u2019azienda Colmar prende spunto dalle iniziali del suo fondatore Mario Colombo. Specializzata nell\u2019abbigliamento sportivo, l\u2019azienda italiana inizialmente presta maggiore attenzione a quello da sci. Ma \u00E8 nel 2009 che nasce la linea Colmar Original dedicata ai giovani e caratterizzata dallo storico logo vintage, da capi di qualit\u00E0 alla moda urban-lifestyle ma pur sempre d\u2019ispirazione sportiva.\n               </div>\n            </div>\n\n            <div class=\"row w-100\" id=\"filtri\">\n              <div class=\"col-md-4 col-6\">\n                <p class=\"m-0\" style=\"color: rgb(52, 52, 52); letter-spacing: 2px; font-weight: 700;\">Genere</p>\n                <p-multiSelect (onChange)=\"search($event)\"  defaultLabel=\"Genere\" [options]=\"sesso\" [(ngModel)]=\"selectedSex\" optionLabel=\"name\" display=\"chip\"  [style]=\"{'width':'100%'}\"\n              [panelStyle]=\"{'width':'400px'}\"></p-multiSelect>\n              </div>\n\n              <div class=\"col-md-4 col-6\">\n                <p class=\"m-0\" style=\"color: rgb(52, 52, 52); letter-spacing: 2px; font-weight: 700;\">Categorie</p>\n                <p-multiSelect (onChange)=\"search($event)\"  defaultLabel=\"Categoria\" [options]=\"categoria\" [(ngModel)]=\"selectedCategoria\" optionLabel=\"name\" display=\"chip\"  [style]=\"{'width':'100%'}\"\n                [panelStyle]=\"{'width':'400px'}\"></p-multiSelect>\n              </div>\n\n              <div class=\"col-md-4 col-6\">\n                <p class=\"m-0\" style=\"color: rgb(52, 52, 52); letter-spacing: 2px; font-weight: 700;\">Brand</p>\n                <p-multiSelect (onChange)=\"search($event)\"  defaultLabel=\"Brand\" [options]=\"brand\" [(ngModel)]=\"selectedBrand\" optionLabel=\"name\" display=\"chip\"  [style]=\"{'width':'100%'}\"\n                [panelStyle]=\"{'width':'400px'}\"></p-multiSelect>\n              </div>\n              <div class=\"col-md-3 col-6\" style=\"display:none\">\n                <p class=\"m-0\" style=\"color: rgb(52, 52, 52); letter-spacing: 2px; font-weight: 700;\">Taglie</p>\n                <p-multiSelect (onChange)=\"search($event)\"  defaultLabel=\"Taglia\" [options]=\"taglia\" [(ngModel)]=\"selectedTaglia\" optionLabel=\"name\" display=\"chip\"  [style]=\"{'width':'100%'}\"\n                [panelStyle]=\"{'width':'400px'}\"></p-multiSelect>\n              </div>\n            </div>\n          </div>\n\n      </div>\n    </div>\n    \n\n    <div class=\"row\" style=\"justify-content: center;\">\n      <div class=\"col-12\">    <p-paginator [rows]=\"1\" (onPageChange)=\"changePage($event)\"[totalRecords]=\"products.length/10\" [first] = 'first'></p-paginator></div>\n    <div class=\"col-12 p-1\"  style=\"max-width: 1300px;\">\n      <div class=\"grid mobileProdListGrid\" style=\"justify-content: center;\"  *ngIf=\"productOnThisPage\" >\n        <div class=\"col-auto mobileProdList p-0\" *ngFor=\"let product of productOnThisPage\" >\n\n          <eshop-frontend-product-item [product]=\"product\" ></eshop-frontend-product-item>\n        </div>\n\n      </div>\n    </div>\n  </div>\n  </div>\n\n", styles: [".filters{width:100%}@media screen and (max-width: 516px){.mobileProdList{padding:3px}.PDLdescription{display:none}}@media screen and (min-width: 516px){.filters{width:95%}}@media screen and (min-width: 1500px){.filters{width:92%}}@media screen and (min-width: 1850px){.filters{width:89%}}@media screen and (min-width: 1950px){.filters{width:80%}}\n"] }]
    }], function () { return [{ type: i1.ProductsService }, { type: i2.CategoriesService }, { type: i3.ActivatedRoute }]; }, { product: [{
            type: Input
        }], paginator: [{
            type: ViewChild,
            args: ['paginator', { static: true }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3Byb2R1Y3RzL3NyYy9saWIvcGFnZXMvcHJvZHVjdHMtbGlzdC9wcm9kdWN0cy1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvcHJvZHVjdHMvc3JjL2xpYi9wYWdlcy9wcm9kdWN0cy1saXN0L3Byb2R1Y3RzLWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXJELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lDa0QxRCwrQkFBb0Y7SUFFbEYsa0RBQWdGO0lBQ2xGLGlCQUFNOzs7SUFEeUIsZUFBbUI7SUFBbkIsb0NBQW1COzs7SUFIcEQsK0JBQWtHO0lBQ2hHLDhFQUdNO0lBRVIsaUJBQU07OztJQUx5RCxlQUFvQjtJQUFwQixrREFBb0I7Ozs7QURwQnpGLE1BQU0sT0FBTyxxQkFBcUI7SUE2Q2hDLFlBQW9CLGVBQWdDLEVBQ2hDLFVBQTZCLEVBQzdCLEtBQXFCO1FBRnJCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQTlDekMsY0FBUyxHQUFHLEtBQUssQ0FBQTtRQUNqQixhQUFRLEdBQWlC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QUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBRSxDQUFDO1FBQ25hLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFHLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDLEVBQUcsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBRyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxFQUFHLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLEVBQUcsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBRyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFHLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUcsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsRUFBRyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDaFgsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUcsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFHLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUcsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFHLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUcsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFHLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUcsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsRUFBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFHLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLEVBQUcsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsRUFBRyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxFQUFHLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUcsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsRUFBRyxFQUFDLElBQUks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QXZCLDRDQUF1Qjs7dUZEbkJ4RixxQkFBcUI7Y0FMakMsU0FBUzsyQkFDRSw4QkFBOEI7K0hBa0IvQixPQUFPO2tCQUFmLEtBQUs7WUFDb0MsU0FBUztrQkFBbEQsU0FBUzttQkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBhZ2luYXRvciB9IGZyb20gJ3ByaW1lbmcvcGFnaW5hdG9yJztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NhdGVnb3J5JztcbmltcG9ydCB7IFByb2R1Y3QxMjMgfSBmcm9tICcuLi8uLi9tb2RlbHMvcHJvZHVjdDEyMyc7XG5pbXBvcnQgeyBXX1Byb2R1Y3QgfSBmcm9tICcuLi8uLi9tb2RlbHMvdy1wcm9kdWN0JztcbmltcG9ydCB7IENhdGVnb3JpZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2F0ZWdvcmllcy5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y3RzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Byb2R1Y3RzLnNlcnZpY2UnO1xuaW1wb3J0IHsgV19Qcm9kdWN0c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy93LXByb2R1Y3RzLnNlcnZpY2UnO1xuXG5cblxuaW50ZXJmYWNlIFNlc3NvIHtcbiAgbmFtZTogc3RyaW5nLFxuICBjb2RlOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIENhdGVnb3JpYSB7XG4gIG5hbWU6IHN0cmluZyxcbiAgY29kZTogc3RyaW5nXG59XG5cbmludGVyZmFjZSBCcmFuZHtcbiAgbmFtZTogc3RyaW5nLFxuICBjb2RlOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIFRhZ2xpYXtcbiAgbmFtZTogc3RyaW5nLFxuICBjb2RlOiBzdHJpbmdcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXNob3AtZnJvbnRlbmQtcHJvZHVjdHMtbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9kdWN0cy1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJvZHVjdC1saXN0LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0c0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc0NoZWNrZWQgPSBmYWxzZVxuICBwcm9kdWN0czogUHJvZHVjdDEyM1tdID0gW107XG4gIGNhdGVnb3JpZXM6IENhdGVnb3J5W10gPSBbXTtcbiAgYmluYXJ5UHJvcCA9IHRydWU7XG4gIGlzQ2F0ZWdvcnlQYWdlOiBib29sZWFuO1xuICB1cmw7XG4gIF91cmxTZWdtZW50O1xuICBjYXRlZ29yeUlkO1xuICBzZWxlY3RlZENhdGVnb3JpZXMgPSBbXTtcbiAgc2V4ID0gXCJcIjtcblxuICBjdXJyZW50SWQ6IHN0cmluZztcbiAgYnJhbmROYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByb2R1Y3Q6IFByb2R1Y3QxMjM7XG4gIEBWaWV3Q2hpbGQoJ3BhZ2luYXRvcicsIHsgc3RhdGljOiB0cnVlIH0pIHBhZ2luYXRvcjogUGFnaW5hdG9yXG5cbiAgcHJvZHVjdE9uVGhpc1BhZ2U6IFByb2R1Y3QxMjNbXSA9IFtdO1xuICB3UHJvZHM6IFdfUHJvZHVjdFtdID0gW107XG4gIGZpbHRlcmVkUHJvZHVjdHM6IFByb2R1Y3QxMjNbXSA9IFtdO1xuXG4gIGN1cnJlbnRQYWdlO1xuXG4gIGZyb21DYXJvdXNlbDogYm9vbGVhbjtcbiAgZmlyc3QgPSAwO1xuXG5cbiAgc2Vzc28gOiBTZXNzb1tdO1xuICBzZWxlY3RlZFNleCA6IFNlc3NvW107XG5cbiAgY2F0ZWdvcmlhIDogQ2F0ZWdvcmlhW107XG4gIHNlbGVjdGVkQ2F0ZWdvcmlhIDogQ2F0ZWdvcmlhW107XG5cbiAgYnJhbmQ6IEJyYW5kW107XG4gIHNlbGVjdGVkQnJhbmQgOiBCcmFuZFtdO1xuXG4gIHRhZ2xpYTogVGFnbGlhW107XG4gIHNlbGVjdGVkVGFnbGlhIDogVGFnbGlhW107XG5cblxuXG4gICBjYXRlZ29yeU1hcCA9IG5ldyBNYXA8c3RyaW5nLHN0cmluZz4oKTtcbiAgY3VycmVudENhdGVnb3J5IDogQ2F0ZWdvcmlhID0ge25hbWU6XCJsdWNhXCIsIGNvZGU6XCJva1wifTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJvZHVjdHNTZXJ2aWNlOiBQcm9kdWN0c1NlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2F0U2VydmljZTogQ2F0ZWdvcmllc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7IFxuXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5TWFwLnNldChcIjYxYWI3ZGJhZjYzNjRlMzhhNWI2Mjk3YlwiLCBcIkNhbWljaWVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeU1hcC5zZXQoXCJjYW1pY2VcIiwgXCI2MWFiN2RiYWY2MzY0ZTM4YTViNjI5N2JcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeU1hcC5zZXQoIFwiNjFhYmY0YTI1NzQ1MGZjMjUxNzQ4OGYwXCIsIFwiUG9sb1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5TWFwLnNldCggXCI2MWI2MzFhZjBkN2UzM2Q4MmI1MjRjMTBcIiwgXCJQYW50YWxvbmlcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeU1hcC5zZXQoIFwiNjFiZGRkZmYyZGRjNGE4YzEzZGY0YTE3XCIsXCJHaWFjY2hlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlNYXAuc2V0KFwiNjFiZGY4MDk4NzIzNTBmODQwYzg5NzlkXCIsXCJGZWxwZVwiICk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeU1hcC5zZXQoXCI2MWUxYTYyZDgxNTcyYmI2NGJkOGQ3M2JcIixcIk1hZ2xpb25pXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlNYXAuc2V0KFwiNjFlN2NkYzQyZWVkYWQ5MTM1Mjk2ZDUwXCIsXCJHaWxldFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5TWFwLnNldChcIjYyNGFjMzRlOWEzZmI0ZDBiZjA0ZWRkMlwiLCBcIlNuZWFrZXJzXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlNYXAuc2V0KFwiNjI0YWM3ODQ1MDNhYmJhMzk5ODQ1MjY1XCIsIFwiVC1zaGlydFwiICk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeU1hcC5zZXQoXCJ0LXNoaXJ0IG1sXCIsIFwiNjI0YWM3ODQ1MDNhYmJhMzk5ODQ1MjY1XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlNYXAuc2V0KCBcIjYyNGFjN2Y3NTAzYWJiYTM5OTg0NTI2ZFwiLCBcIkdpdWJib3R0aVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5TWFwLnNldChcImdpdWJib3R0b1wiLCBcIjYyNGFjN2Y3NTAzYWJiYTM5OTg0NTI2ZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5TWFwLnNldCggXCI2MzJlYjc0MTU0NGFkZGQ2ZWE2YzJiZGRcIixcIkNpbnR1cmVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeU1hcC5zZXQoXCI2MzJlYjc1NDU0NGFkZGQ2ZWE2YzJiZTBcIixcIlNjYXJwZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5TWFwLnNldChcImJlcm11ZGFcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeU1hcC5zZXQoXCI2MzJlYjc2MjU0NGFkZGQ2ZWE2YzJiZTNcIixcIkplYW5zXCIpO1xuXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlc3NvID0gWyB7bmFtZTogJ1VvbW8nLCBjb2RlOiAnTSd9LCAge25hbWU6ICdEb25uYScsIGNvZGU6ICdGJ31dO1xuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmlhID0gW3tuYW1lOidDYW1pY2llJywgY29kZTonY2FtaWNpZSd9LCB7bmFtZTonUG9sbycsIGNvZGU6J3BvbG8nfSwge25hbWU6J1BhbnRhbG9uaScsIGNvZGU6J3BhbnRhbG9uaSd9LCB7bmFtZTonRmVscGUnLCBjb2RlOidmZWxwZSd9LCB7bmFtZTonTWFnbGlvbmknLCBjb2RlOidtYWdsaW9uaSd9LCB7bmFtZTonR2lsZXQnLCBjb2RlOidnaWxldCd9LCB7bmFtZTonU25lYWtlcnMnLCBjb2RlOidzbmVha2Vycyd9LCB7bmFtZTonVC1zaGlydCcsIGNvZGU6J3Qtc2hpcnQnfSwge25hbWU6J0dpdWJib3R0aScsIGNvZGU6J2dpdWJib3R0aSd9LCB7bmFtZTonQ2ludHVyZScsIGNvZGU6J2NpbnR1cmUnfSwge25hbWU6J1NjYXJwZScsIGNvZGU6J3NjYXJwZSd9LCB7bmFtZTonSmVhbnMnLCBjb2RlOidqZWFucyd9LF07XG4gICAgICAgICAgICAgICAgdGhpcy5icmFuZCA9IFsge25hbWU6ICdCbGF1ZXInLCBjb2RlOiAnYmxhdWVyJ30sICB7bmFtZTogJ09sZCBSaXZlcicsIGNvZGU6ICdvbGQgcml2ZXInfSwgIHtuYW1lOiAnQ29sbWFyJywgY29kZTogJ2NvbG1hcid9LCAge25hbWU6ICdFQTcnLCBjb2RlOiAnZWE3J30sICB7bmFtZTogJ0t3YXknLCBjb2RlOiAna3dheSd9LCAge25hbWU6ICdMYWNvc3RlJywgY29kZTogJ2xhY29zdGUnfSwgIHtuYW1lOiAnQmFyYm91cicsIGNvZGU6ICdiYXJib3VyJ30sICB7bmFtZTogJ0NpZXNzZScsIGNvZGU6ICdjaWVzc2UnfSwgIHtuYW1lOiAnSHVza3knLCBjb2RlOiAnaHVza3knfSwgIHtuYW1lOiAnQ2FuYWRpZW5zJywgY29kZTogJ2NhbmFkaWVucyd9XTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ2xpYSA9IFsge25hbWU6ICczNycsIGNvZGU6ICczNyd9LCAge25hbWU6ICczOCcsIGNvZGU6ICczOCd9LCAge25hbWU6ICczOScsIGNvZGU6ICczOSd9LCAge25hbWU6ICc0MCcsIGNvZGU6ICc0MCd9LCAge25hbWU6ICc0MScsIGNvZGU6ICc0MSd9LCAge25hbWU6ICc0MicsIGNvZGU6ICc0Mid9LCAge25hbWU6ICc0MycsIGNvZGU6ICc0Myd9LCAge25hbWU6ICc0NCcsIGNvZGU6ICc0NCd9LCAge25hbWU6ICc0NScsIGNvZGU6ICc0NSd9LCAge25hbWU6ICc0NicsIGNvZGU6ICc0Nid9LCAge25hbWU6ICdYWFMnLCBjb2RlOiAneHhzJ30sICB7bmFtZTogJ1hTJywgY29kZTogJ3hzJ30sICB7bmFtZTogJ1MnLCBjb2RlOiAncyd9LCAge25hbWU6ICdNJywgY29kZTogJ20nfSwgIHtuYW1lOiAnTCcsIGNvZGU6ICdsJ30sICB7bmFtZTogJ1hMJywgY29kZTogJ3hsJ30sICB7bmFtZTogJ1hYTCcsIGNvZGU6ICd4eGwnfSwgIHtuYW1lOiAnWFhYTCcsIGNvZGU6ICd4eHhsJ31dO1xuICAgICAgICAgICAgICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFNleCA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yaWEgPSBbXTtcblxuICAgIHRoaXMudXJsID0gdGhpcy5yb3V0ZS51cmw7XG4gICAgdGhpcy5fdXJsU2VnbWVudCA9IHRoaXMudXJsLnZhbHVlWzBdLnBhdGhcbiAgICBjb25zb2xlLmxvZyh0aGlzLl91cmxTZWdtZW50KTtcblxuXG4gICAgICBcbiAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZSgocGFyYW1zKT0+e1xuICAgICBcbiAgICAgICAgdGhpcy5jYXRlZ29yeUlkID0gcGFyYW1zLmNhdGVnb3J5aWRcbiAgICAgICAgY29uc29sZS5sb2coXCJjYXRlZ29yeSBpZCA9IFwiICsgdGhpcy5jYXRlZ29yeUlkKVxuICAgICAgICB0aGlzLl9nZXRQcm9kdWN0cygpO1xuICAgICBcblxuICAgICAgICB0aGlzLmN1cnJlbnRDYXRlZ29yeS5uYW1lID0gdGhpcy5jYXRlZ29yeU1hcC5nZXQodGhpcy5jYXRlZ29yeUlkKTtcbiAgICAgICAgbGV0IG5tbSA9IHRoaXMuY3VycmVudENhdGVnb3J5Lm5hbWVcbiAgICAgICAgbGV0IGNkZCA9IFwiXCI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhdGVnb3JpYS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgIGlmKGVsZW1lbnQubmFtZSA9PSBubW0pe1xuICAgICAgICAgICAgY2RkID0gZWxlbWVudC5jb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYobm1tICE9IG51bGwpe1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcmlhLnB1c2goe25hbWUgOiBubW0sIGNvZGU6IGNkZH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY3VycmVudENhdGVnb3J5Lm5hbWUgPSBcIlJpY2VyY2EgUGVyc29uYWxpenphdGFcIlxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZENhdGVnb3JpZXMpKVxuXG4gICAgICAgIFxuICAgICAgICB0aGlzLmN1cnJlbnRDYXRlZ29yeS5jb2RlID0gY2RkO1xuXG5cbiAgICAgICAgY29uc29sZS5sb2coXCJub21lIGRlbGxhIGNhdGVnb3JpYSA9IFwiICsgdGhpcy5jdXJyZW50Q2F0ZWdvcnkubmFtZSlcbiAgICAgICAgY29uc29sZS5sb2coXCJjb2RlIGRlbGxhIGNhdGVnb3JpYSA9IFwiICsgdGhpcy5jdXJyZW50Q2F0ZWdvcnkuY29kZSlcblxuICAgICAgIFxuICAgICAgfSlcblxuXG4gICAgICBsZXQgc3RvcmVkU2V4ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjYXRlZ29yaWFcIik7XG4gICAgICBpZihzdG9yZWRTZXggPT0gXCJ1b21vXCIpIHRoaXMuc2VsZWN0ZWRTZXgucHVzaCh7bmFtZTogJ1VvbW8nLCBjb2RlOiAnTSd9KVxuICAgICAgaWYoc3RvcmVkU2V4ID09IFwiZG9ubmFcIikgdGhpcy5zZWxlY3RlZFNleC5wdXNoKHtuYW1lOiAnRG9ubmEnLCBjb2RlOiAnRid9KVxuICAgICBcbiAgICAgICBcbiAgICBcbiAgfVxuXG4gIGNoYW5nZVBhZ2UoZXZlbnQ6YW55KTp2b2lke1xuICAgIGNvbnNvbGUubG9nKFwiIGNoYW5nZSBwYWdlIGNlcmNvIHRyYSBxdWVzdG8gaW5kaWNlIDogXCIgKyAoKGV2ZW50LnBhZ2UgKiAxMCkpKyBcIiBlIHF1ZXN0byBcIiArICgoZXZlbnQucGFnZSArMSkgKiAxMCkgKyBcIiBjdXJyZW50IHBhZ2UgPSBcIiArIHRoaXMuY3VycmVudFBhZ2UpO1xuXG4gICAgdGhpcy5wcm9kdWN0T25UaGlzUGFnZSA9IHRoaXMucHJvZHVjdHMuc2xpY2UoKGV2ZW50LnBhZ2UgKiAxMCksICgoZXZlbnQucGFnZSArIDEpICogMTApICk7XG4gIH1cblxuXG4gIHNlYXJjaChldmVudDphbnkpOnZvaWR7XG5cbiAgXG5cbiAgICBsZXQgc2Vzc28yMzogc3RyaW5nW107XG4gICAgc2Vzc28yMyA9IFtdO1xuXG4gICAgaWYodGhpcy5zZWxlY3RlZFNleCl7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpPCB0aGlzLnNlbGVjdGVkU2V4Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgc2Vzc28yMy5wdXNoKHRoaXMuc2VsZWN0ZWRTZXhbaV0uY29kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhzZXNzbzIzKTtcblxuXG5cbiAgICBsZXQgY2F0ZWdvcmllOiBzdHJpbmdbXTtcbiAgICBjYXRlZ29yaWUgPSBbXTtcblxuICAgIGlmKHRoaXMuc2VsZWN0ZWRDYXRlZ29yaWEpe1xuICAgICAgZm9yKGxldCBpID0gMDsgaTwgdGhpcy5zZWxlY3RlZENhdGVnb3JpYS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGNhdGVnb3JpZS5wdXNoKHRoaXMuc2VsZWN0ZWRDYXRlZ29yaWFbaV0uY29kZSlcbiAgICAgIH1cbiAgICB9XG4gICBcblxuXG4gICAgbGV0IGJyYW5kOiBzdHJpbmdbXTtcbiAgICBicmFuZCA9IFtdO1xuXG4gICAgaWYodGhpcy5zZWxlY3RlZEJyYW5kKXtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGk8IHRoaXMuc2VsZWN0ZWRCcmFuZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGJyYW5kLnB1c2godGhpcy5zZWxlY3RlZEJyYW5kW2ldLmNvZGUpXG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBsZXQgdGFnbGllOiBzdHJpbmdbXTtcbiAgICB0YWdsaWUgPSBbXTtcblxuXG5cbiAgICBpZih0aGlzLnNlbGVjdGVkVGFnbGlhKXtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGk8IHRoaXMuc2VsZWN0ZWRUYWdsaWEubGVuZ3RoOyBpKyspe1xuICAgICAgICB0YWdsaWUucHVzaCh0aGlzLnNlbGVjdGVkVGFnbGlhW2ldLmNvZGUpXG4gICAgICB9XG4gICAgfVxuIFxuXG4gICAgY29uc29sZS5sb2coXCJTZXNzbyA9IFwiICsgc2Vzc28yMyArIFwiIGNhdGVnb3JpZSA9IFwiICsgY2F0ZWdvcmllKTtcblxuICAgIHRoaXMucHJvZHVjdHNTZXJ2aWNlLmdldEZpbHRlcmVkUHJvZHVjdHMoYnJhbmQsIGNhdGVnb3JpZSwgc2Vzc28yMywgdGFnbGllKS5zdWJzY3JpYmUoKHByb2R1Y3RzKT0+e1xuICAgICAgdGhpcy5wcm9kdWN0cyA9IHByb2R1Y3RzO1xuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpPCB0aGlzLnByb2R1Y3RzLmxlbmd0aCAtIDE7IGkrKyl7XG4gICAgICAgIGlmKHRoaXMucHJvZHVjdHNbaV0ucHJvZHVjdElkID09IHRoaXMucHJvZHVjdHNbaSsxXS5wcm9kdWN0SWQpe1xuXG4gICAgICAgICAgZm9yKGxldCB5ID0gaTsgeTwgdGhpcy5wcm9kdWN0cy5sZW5ndGgtMTsgeSsrKXtcbiAgICAgICAgICAgIGlmKHRoaXMucHJvZHVjdHNbeV0ucHJvZHVjdElkID09IHRoaXMucHJvZHVjdHNbeSsxXS5wcm9kdWN0SWQpe1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0cy5zcGxpY2UoaSx5LWkpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgXG4gICAgICAgIH1cbiAgICBcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coXCJobyB0cm92YXRvIHF1ZXN0aSBwcm9kdWN0cyA6IFwiICsgcHJvZHVjdHMpO1xuICBcbiAgICBcbiAgICAgIHRoaXMucHJvZHVjdE9uVGhpc1BhZ2UgPSB0aGlzLnByb2R1Y3RzLnNsaWNlKDAsICAxMCk7XG5cbiAgICAgIFxuICAgICAgdGhpcy5maWx0ZXJlZFByb2R1Y3RzID0gcHJvZHVjdHM7XG5cbiAgICAvLyAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBhZ2luYXRvci5jaGFuZ2VQYWdlKDEpKTtcbiAgICAgIHRoaXMuZmlyc3QgPSAwO1xuICAgICAgXG4gICAgfSk7IFxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJvZHVjdHMoKSB7XG5cbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcmllcy5wdXNoKHRoaXMuY2F0ZWdvcnlJZClcblxuICAgIGNvbnNvbGUubG9nKFwiZmFjY2lvIGxhIHJpY2hpZXN0YSBnZXQgcHJvZHVjdHNcIilcblxuICAgIHN3aXRjaChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNhdGVnb3JpYVwiKSkge1xuICAgICAgY2FzZSBcInVvbW9cIjpcbiAgICAgICAgdGhpcy5zZXggPSBcIk1cIlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb25uYVwiOlxuICAgICAgICB0aGlzLnNleCA9IFwiRlwiXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gY29kZSBibG9ja1xuICAgIH1cblxuICAgIGlmKHRoaXMuc2VsZWN0ZWRDYXRlZ29yaWVzWzBdICE9IG51bGwpe1xuXG4gICAgdGhpcy5wcm9kdWN0c1NlcnZpY2UuZ2V0RmlsdGVyZWRQcm9kdWN0cyhudWxsLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcmllcywgW3RoaXMuc2V4XSwgbnVsbCkuc3Vic2NyaWJlKChwcm9kdWN0cyk9PntcbiAgICAgIHRoaXMucHJvZHVjdHMgPSBwcm9kdWN0c1xuICAgICAgZm9yKGxldCBpID0gMDsgaTwgdGhpcy5wcm9kdWN0cy5sZW5ndGggLSAxOyBpKyspe1xuICAgICAgICBpZih0aGlzLnByb2R1Y3RzW2ldLnByb2R1Y3RJZCA9PSB0aGlzLnByb2R1Y3RzW2krMV0ucHJvZHVjdElkKXtcblxuICAgICAgICAgIGZvcihsZXQgeSA9IGk7IHk8IHRoaXMucHJvZHVjdHMubGVuZ3RoLTE7IHkrKyl7XG4gICAgICAgICAgICBpZih0aGlzLnByb2R1Y3RzW3ldLnByb2R1Y3RJZCA9PSB0aGlzLnByb2R1Y3RzW3krMV0ucHJvZHVjdElkKXtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIHRoaXMucHJvZHVjdHMuc3BsaWNlKGkseS1pKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG4gICAgICB9XG5cbiAgICAvLyAgdGhpcy5zaHVmZmxlQXJyYXkodGhpcy5wcm9kdWN0cyk7XG4gICAgICB0aGlzLnByb2R1Y3RPblRoaXNQYWdlID0gdGhpcy5wcm9kdWN0cy5zbGljZSgwLCAgMTApO1xuICAgICAgICBcbiAgICB9KTsgIFxuICAgIH1lbHNle1xuICAgICAgdGhpcy5wcm9kdWN0c1NlcnZpY2UuZ2V0RmlsdGVyZWRQcm9kdWN0cyhudWxsLCBudWxsLCBbdGhpcy5zZXhdLCBudWxsKS5zdWJzY3JpYmUoKHByb2R1Y3RzKT0+e1xuICAgICAgICB0aGlzLnByb2R1Y3RzID0gcHJvZHVjdHM7XG4gICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPCB0aGlzLnByb2R1Y3RzLmxlbmd0aCAtIDE7IGkrKyl7XG4gICAgICAgICAgaWYodGhpcy5wcm9kdWN0c1tpXS5wcm9kdWN0SWQgPT0gdGhpcy5wcm9kdWN0c1tpKzFdLnByb2R1Y3RJZCl7XG5cbiAgICAgICAgICAgIGZvcihsZXQgeSA9IGk7IHk8IHRoaXMucHJvZHVjdHMubGVuZ3RoLTE7IHkrKyl7XG4gICAgICAgICAgICAgIGlmKHRoaXMucHJvZHVjdHNbeV0ucHJvZHVjdElkID09IHRoaXMucHJvZHVjdHNbeSsxXS5wcm9kdWN0SWQpe1xuICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0cy5zcGxpY2UoaSx5LWkpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvZHVjdE9uVGhpc1BhZ2UgPSB0aGlzLnByb2R1Y3RzLnNsaWNlKDAsICAxMCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJobyB0cm92YXRvIHF1ZXN0aSBwcm9kb3R0aSBwZXIgcXVlc3RhIGNhdGVnb3JpYSA6IFwiICsgdGhpcy5wcm9kdWN0cylcbiAgICAgIH0pOyAgXG4gICAgfSAgXG4gIH1cblxuXG4gIHNodWZmbGVBcnJheShhcnJheSkge1xuICAgIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgW2FycmF5W2ldLCBhcnJheVtqXV0gPSBbYXJyYXlbal0sIGFycmF5W2ldXTtcbiAgICB9XG59XG5cblxuICBjYXRlZ29yeUZpbHRlcigpe1xuICAgIHRoaXMucHJvZHVjdHMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcmllcyA9IHRoaXMuY2F0ZWdvcmllcy5maWx0ZXIoKGNhdGVnb3J5KT0+IGNhdGVnb3J5LmNoZWNrZWQpLm1hcCgoY2F0ZWdvcnkpPT4gY2F0ZWdvcnkuaWQpXG4gICAgY29uc29sZS5sb2coXCJjYXRlZ29yaWUgPSBcIiArIHRoaXMuc2VsZWN0ZWRDYXRlZ29yaWVzKTtcbiAgICBcblxuXG4gICAgdGhpcy5wcm9kdWN0c1NlcnZpY2UuZ2V0RmlsdGVyZWRQcm9kdWN0cyhudWxsLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcmllcywgW3RoaXMuc2V4XSkuc3Vic2NyaWJlKChwcm9kdWN0cyk9PntcbiAgICAgIHRoaXMucHJvZHVjdHMgPSBwcm9kdWN0cztcbiAgIFxuICAgIH0pOyAgIFxuICAgIFxuICB9XG5cbn0iLCI8c2NyaXB0IHNyYz1cIi8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvanF1ZXJ5LzIuMC4zL2pxdWVyeS5taW4uanNcIj48L3NjcmlwdD5cblxuXG4gIDxkaXYgY2xhc3M9XCJncmlkXCIgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcIj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicm93IGZpbHRlcnNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgZC1mbGV4XCIgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcIj5cbiAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQgdy0xMDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiIHN0eWxlPVwiaGVpZ2h0OiAyNDBweDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHBzOi8vc2NpdXRpLml0L2ltbWFnaW5pL2NvcGVydGluZS9jb2xtYXItcGl1bWluaS1haTE3LWRlc2t0b3AuanBnKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcIj5cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyB3LTEwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyXCIgc3R5bGU9XCJmb250LXNpemU6IDI5cHg7IGxldHRlci1zcGFjaW5nOjJweDsgZm9udC13ZWlnaHQ6IDkwMDtcIj5cbiAgICAgICAgICAgICAgIHt7dGhpcy5jdXJyZW50Q2F0ZWdvcnkubmFtZX19XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIFBETGRlc2NyaXB0aW9uXCIgc3R5bGU9XCJtYXgtaGVpZ2h0OiAxNDBweDsgb3ZlcmZsb3cteTphdXRvXCI+XG4gICAgICAgICAgICAgICAgTmF0YSBhIE1vbnphIG5lbCAxOTIzLCBpbCBub21lIGRlbGzigJlhemllbmRhIENvbG1hciBwcmVuZGUgc3B1bnRvIGRhbGxlIGluaXppYWxpIGRlbCBzdW8gZm9uZGF0b3JlIE1hcmlvIENvbG9tYm8uIFNwZWNpYWxpenphdGEgbmVsbOKAmWFiYmlnbGlhbWVudG8gc3BvcnRpdm8sIGzigJlhemllbmRhIGl0YWxpYW5hIGluaXppYWxtZW50ZSBwcmVzdGEgbWFnZ2lvcmUgYXR0ZW56aW9uZSBhIHF1ZWxsbyBkYSBzY2kuIE1hIMOoIG5lbCAyMDA5IGNoZSBuYXNjZSBsYSBsaW5lYSBDb2xtYXIgT3JpZ2luYWwgZGVkaWNhdGEgYWkgZ2lvdmFuaSBlIGNhcmF0dGVyaXp6YXRhIGRhbGxvIHN0b3JpY28gbG9nbyB2aW50YWdlLCBkYSBjYXBpIGRpIHF1YWxpdMOgIGFsbGEgbW9kYSB1cmJhbi1saWZlc3R5bGUgbWEgcHVyIHNlbXByZSBk4oCZaXNwaXJhemlvbmUgc3BvcnRpdmEuXG4gICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHctMTAwXCIgaWQ9XCJmaWx0cmlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00IGNvbC02XCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJtLTBcIiBzdHlsZT1cImNvbG9yOiByZ2IoNTIsIDUyLCA1Mik7IGxldHRlci1zcGFjaW5nOiAycHg7IGZvbnQtd2VpZ2h0OiA3MDA7XCI+R2VuZXJlPC9wPlxuICAgICAgICAgICAgICAgIDxwLW11bHRpU2VsZWN0IChvbkNoYW5nZSk9XCJzZWFyY2goJGV2ZW50KVwiICBkZWZhdWx0TGFiZWw9XCJHZW5lcmVcIiBbb3B0aW9uc109XCJzZXNzb1wiIFsobmdNb2RlbCldPVwic2VsZWN0ZWRTZXhcIiBvcHRpb25MYWJlbD1cIm5hbWVcIiBkaXNwbGF5PVwiY2hpcFwiICBbc3R5bGVdPVwieyd3aWR0aCc6JzEwMCUnfVwiXG4gICAgICAgICAgICAgIFtwYW5lbFN0eWxlXT1cInsnd2lkdGgnOic0MDBweCd9XCI+PC9wLW11bHRpU2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTQgY29sLTZcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm0tMFwiIHN0eWxlPVwiY29sb3I6IHJnYig1MiwgNTIsIDUyKTsgbGV0dGVyLXNwYWNpbmc6IDJweDsgZm9udC13ZWlnaHQ6IDcwMDtcIj5DYXRlZ29yaWU8L3A+XG4gICAgICAgICAgICAgICAgPHAtbXVsdGlTZWxlY3QgKG9uQ2hhbmdlKT1cInNlYXJjaCgkZXZlbnQpXCIgIGRlZmF1bHRMYWJlbD1cIkNhdGVnb3JpYVwiIFtvcHRpb25zXT1cImNhdGVnb3JpYVwiIFsobmdNb2RlbCldPVwic2VsZWN0ZWRDYXRlZ29yaWFcIiBvcHRpb25MYWJlbD1cIm5hbWVcIiBkaXNwbGF5PVwiY2hpcFwiICBbc3R5bGVdPVwieyd3aWR0aCc6JzEwMCUnfVwiXG4gICAgICAgICAgICAgICAgW3BhbmVsU3R5bGVdPVwieyd3aWR0aCc6JzQwMHB4J31cIj48L3AtbXVsdGlTZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNCBjb2wtNlwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibS0wXCIgc3R5bGU9XCJjb2xvcjogcmdiKDUyLCA1MiwgNTIpOyBsZXR0ZXItc3BhY2luZzogMnB4OyBmb250LXdlaWdodDogNzAwO1wiPkJyYW5kPC9wPlxuICAgICAgICAgICAgICAgIDxwLW11bHRpU2VsZWN0IChvbkNoYW5nZSk9XCJzZWFyY2goJGV2ZW50KVwiICBkZWZhdWx0TGFiZWw9XCJCcmFuZFwiIFtvcHRpb25zXT1cImJyYW5kXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZEJyYW5kXCIgb3B0aW9uTGFiZWw9XCJuYW1lXCIgZGlzcGxheT1cImNoaXBcIiAgW3N0eWxlXT1cInsnd2lkdGgnOicxMDAlJ31cIlxuICAgICAgICAgICAgICAgIFtwYW5lbFN0eWxlXT1cInsnd2lkdGgnOic0MDBweCd9XCI+PC9wLW11bHRpU2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIGNvbC02XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm0tMFwiIHN0eWxlPVwiY29sb3I6IHJnYig1MiwgNTIsIDUyKTsgbGV0dGVyLXNwYWNpbmc6IDJweDsgZm9udC13ZWlnaHQ6IDcwMDtcIj5UYWdsaWU8L3A+XG4gICAgICAgICAgICAgICAgPHAtbXVsdGlTZWxlY3QgKG9uQ2hhbmdlKT1cInNlYXJjaCgkZXZlbnQpXCIgIGRlZmF1bHRMYWJlbD1cIlRhZ2xpYVwiIFtvcHRpb25zXT1cInRhZ2xpYVwiIFsobmdNb2RlbCldPVwic2VsZWN0ZWRUYWdsaWFcIiBvcHRpb25MYWJlbD1cIm5hbWVcIiBkaXNwbGF5PVwiY2hpcFwiICBbc3R5bGVdPVwieyd3aWR0aCc6JzEwMCUnfVwiXG4gICAgICAgICAgICAgICAgW3BhbmVsU3R5bGVdPVwieyd3aWR0aCc6JzQwMHB4J31cIj48L3AtbXVsdGlTZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIFxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBjZW50ZXI7XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyXCI+ICAgIDxwLXBhZ2luYXRvciBbcm93c109XCIxXCIgKG9uUGFnZUNoYW5nZSk9XCJjaGFuZ2VQYWdlKCRldmVudClcIlt0b3RhbFJlY29yZHNdPVwicHJvZHVjdHMubGVuZ3RoLzEwXCIgW2ZpcnN0XSA9ICdmaXJzdCc+PC9wLXBhZ2luYXRvcj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIHAtMVwiICBzdHlsZT1cIm1heC13aWR0aDogMTMwMHB4O1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImdyaWQgbW9iaWxlUHJvZExpc3RHcmlkXCIgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcIiAgKm5nSWY9XCJwcm9kdWN0T25UaGlzUGFnZVwiID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvIG1vYmlsZVByb2RMaXN0IHAtMFwiICpuZ0Zvcj1cImxldCBwcm9kdWN0IG9mIHByb2R1Y3RPblRoaXNQYWdlXCIgPlxuXG4gICAgICAgICAgPGVzaG9wLWZyb250ZW5kLXByb2R1Y3QtaXRlbSBbcHJvZHVjdF09XCJwcm9kdWN0XCIgPjwvZXNob3AtZnJvbnRlbmQtcHJvZHVjdC1pdGVtPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cblxuIl19