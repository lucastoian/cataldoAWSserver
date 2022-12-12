import { Subject } from 'rxjs';
import { ProductLuca } from './productLuca';
import { Injectable } from '@angular/core';
import { ProductVariant } from './productVariant';
import * as i0 from "@angular/core";
export class Cart {
    constructor() {
        this.products = [];
        this.items = new Subject();
        setInterval(() => {
            // Make your auth call and export this from Service
            //console.log("updating total number = " + this.getTotalNumberOfItems());
            this.items.next(this.getTotalNumberOfItems());
        }, 2000);
    }
    ngOnInit() {
        console.log("basta chiamare carrello");
        Cart.getInstance();
    }
    static getInstance() {
        if (!Cart.sortedCart) {
            Cart.sortedCart = new Cart();
        }
        return Cart.sortedCart;
    }
    addProductLuca(ProductLuca) {
        //qui check se il prodotto non c'è gia
        this.products.push(ProductLuca);
        localStorage.setItem("cartByLuca", JSON.stringify(this.products));
    }
    emptyCart() {
        this.products = [];
        this.updateLocalStorage();
    }
    getproducts() {
        return this.products;
    }
    getproductsSize() {
        return this.products.length;
    }
    getProduct(index) {
        //console.log("get product = " + this.products[index].getJson());
        return this.products[index];
    }
    getJson() {
        return JSON.stringify(this.products);
    }
    getProductById(id) {
        let product = null;
        this.products.forEach(element => {
            if (element.getId() === id) {
                product = element;
            }
        });
        return product;
    }
    getVariantById(id) {
        let productVariant = null;
        this.products.forEach(element => {
            for (let i = 0; i < element.getVariants().length; i++) {
                let variant = element.getVariants()[i];
                if (variant.getId() === id) {
                    productVariant = variant;
                }
            }
        });
        return productVariant;
    }
    getProductByVariantId(id) {
        let product = null;
        this.products.forEach(element => {
            for (let i = 0; i < element.getVariants().length; i++) {
                let variant = element.getVariants()[i];
                if (variant.getId() === id) {
                    product = element;
                }
            }
        });
        return product;
    }
    updateLocalStorage() {
        localStorage.setItem("cartByLuca", JSON.stringify(this.products));
    }
    static generateCartFromLocalStorage() {
        Cart.sortedCart.products = [];
        //      Cart.getInstance();
        //   let cart = new Cart();
        let cartJso2 = localStorage.getItem("cartByLuca");
        console.log("cartJson = " + JSON.stringify(cartJso2));
        if (cartJso2 == null)
            return null;
        let cartJson = [];
        try {
            cartJson = JSON.parse(localStorage.getItem("cartByLuca"));
        }
        catch (e) {
            return null;
        }
        for (let i = 0; i < cartJson.length; i++) {
            let productJson = cartJson[i];
            //console.log(productJson);
            let p = new ProductLuca();
            p.setId(productJson.id);
            p.setDiscount(productJson.discount);
            p.setPrice(productJson.price);
            //console.log("main img inside json = " + productJson.mainImage);
            p.mainImage = productJson.mainImage;
            p.setName(productJson.name);
            let imagesJson = productJson.images;
            for (let y = 0; y < imagesJson.length; y++) {
                p.addImage(imagesJson[y]);
            }
            let variantsJson = productJson.variants;
            for (let y = 0; y < variantsJson.length; y++) {
                let variantJson = variantsJson[y];
                let pVariant = new ProductVariant(variantJson.id, variantJson.size, variantJson.inventory, variantJson.selected, variantJson.barcode);
                //console.log("pVariant = " + pVariant.getJson());
                p.variants.push(pVariant);
            }
            Cart.sortedCart.addProductLuca(p);
        }
        console.log("ho trovato questo carrello: " + JSON.stringify(Cart.sortedCart));
        return Cart.sortedCart;
    }
    containsProduct(product) {
        let contains = false;
        //console.log("product = " + this.getJson());
        this.products.forEach(element => {
            if (element.getId() === product.getId()) {
                contains = true;
                return;
            }
        });
        return contains;
    }
    getProductIndex(product) {
        if (this.containsProduct(product)) {
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].getId() == product.getId()) {
                    return i;
                }
            }
        }
        else {
            return null;
        }
    }
    getAllVariants() {
        let productsVariants = [];
        this.products.forEach(p => {
            p.getVariants().forEach(variant => {
                productsVariants.push(variant);
            });
        });
        return productsVariants;
    }
    getItems() {
        return this.items;
    }
    getTotalNumberOfItems() {
        let total = 0;
        this.products.forEach(p => {
            p.getVariants().forEach(variant => {
                total += variant.getSelected();
            });
        });
        return total;
    }
    getTotalPrice() {
        let total = 0;
        this.products.forEach(p => {
            p.getVariants().forEach(variant => {
                total += variant.getSelected() * (p.getPricec() - p.getDiscount());
            });
        });
        return total;
    }
    deleteProductVariant(product) {
        let p = this.getProductByVariantId(product.getId());
        p.removeVariant(product);
    }
    getTotalNumberOfVariantsOfASingleProductByIdOfAVariant(id) {
        let productSize = null;
        this.products.forEach(element => {
            for (let i = 0; i < element.getVariants().length; i++) {
                let variant = element.getVariants()[i];
                if (variant.getId() === id) {
                    productSize = element.getVariants().length;
                }
            }
        });
        return productSize;
    }
}
Cart.ɵfac = function Cart_Factory(t) { return new (t || Cart)(); };
Cart.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Cart, factory: Cart.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Cart, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvdXNlcnMvc3JjL2xpYi9tb2RlbHMvY2FydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBTWxELE1BQU0sT0FBTyxJQUFJO0lBT2I7UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDM0IsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNiLG1EQUFtRDtZQUNuRCx5RUFBeUU7WUFDekUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDZCxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFPdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNoQztRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRU0sY0FBYyxDQUFDLFdBQXdCO1FBQzFDLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNo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QUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFByb2R1Y3RMdWNhIH0gZnJvbSAnLi9wcm9kdWN0THVjYSdcbmltcG9ydCB7IEluamVjdGFibGUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjdFZhcmlhbnQgfSBmcm9tICcuL3Byb2R1Y3RWYXJpYW50JztcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB9KVxuZXhwb3J0IGNsYXNzIENhcnQgaW1wbGVtZW50cyBPbkluaXR7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzb3J0ZWRDYXJ0OiBDYXJ0O1xuXG4gICAgcHJpdmF0ZSBwcm9kdWN0czogUHJvZHVjdEx1Y2FbXTtcbiAgICBwcml2YXRlIGl0ZW1zOiBTdWJqZWN0PG51bWJlcj47XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgIFxuICAgICAgICB0aGlzLnByb2R1Y3RzID0gW107XG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBNYWtlIHlvdXIgYXV0aCBjYWxsIGFuZCBleHBvcnQgdGhpcyBmcm9tIFNlcnZpY2VcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ1cGRhdGluZyB0b3RhbCBudW1iZXIgPSBcIiArIHRoaXMuZ2V0VG90YWxOdW1iZXJPZkl0ZW1zKCkpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5uZXh0KHRoaXMuZ2V0VG90YWxOdW1iZXJPZkl0ZW1zKCkpO1xuICAgICAgICAgIH0sIDIwMDApXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZHtcbiAgICAgICAgY29uc29sZS5sb2coXCJiYXN0YSBjaGlhbWFyZSBjYXJyZWxsb1wiKTtcblxuICAgICAgICBDYXJ0LmdldEluc3RhbmNlKCk7XG4gICAgIFxuICAgICAgICBcblxuXG4gICAgICBcbiAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IENhcnR7XG4gICAgICAgIGlmICghQ2FydC5zb3J0ZWRDYXJ0KSB7XG4gICAgICAgICAgICBDYXJ0LnNvcnRlZENhcnQgPSBuZXcgQ2FydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIENhcnQuc29ydGVkQ2FydDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUHJvZHVjdEx1Y2EoUHJvZHVjdEx1Y2E6IFByb2R1Y3RMdWNhKSA6dm9pZCB7XG4gICAgICAgIC8vcXVpIGNoZWNrIHNlIGlsIHByb2RvdHRvIG5vbiBjJ8OoIGdpYVxuICAgICAgICB0aGlzLnByb2R1Y3RzLnB1c2goUHJvZHVjdEx1Y2EpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNhcnRCeUx1Y2FcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9kdWN0cykpO1xuXG4gICAgfVxuXG4gICAgcHVibGljIGVtcHR5Q2FydCgpe1xuICAgICAgICB0aGlzLnByb2R1Y3RzID0gW107XG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldHByb2R1Y3RzKCkgOiBQcm9kdWN0THVjYVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldHByb2R1Y3RzU2l6ZSgpIDogbnVtYmVye1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0cy5sZW5ndGg7XG4gICAgfVxuICAgIHB1YmxpYyBnZXRQcm9kdWN0KGluZGV4Om51bWJlcikgOiBQcm9kdWN0THVjYSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0IHByb2R1Y3QgPSBcIiArIHRoaXMucHJvZHVjdHNbaW5kZXhdLmdldEpzb24oKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzW2luZGV4XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SnNvbigpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvZHVjdHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9kdWN0QnlJZChpZDpzdHJpbmcpIDogUHJvZHVjdEx1Y2Ege1xuICAgICAgICBsZXQgcHJvZHVjdCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvZHVjdHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuZ2V0SWQoKSA9PT0gaWQpe1xuICAgICAgICAgICAgICAgIHByb2R1Y3QgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvZHVjdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VmFyaWFudEJ5SWQoaWQ6c3RyaW5nKSA6IFByb2R1Y3RWYXJpYW50IHtcbiAgICAgICAgbGV0IHByb2R1Y3RWYXJpYW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9kdWN0cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpPGVsZW1lbnQuZ2V0VmFyaWFudHMoKS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IHZhcmlhbnQgPSBlbGVtZW50LmdldFZhcmlhbnRzKClbaV07XG4gICAgICAgICAgICAgICAgaWYodmFyaWFudC5nZXRJZCgpID09PSBpZCl7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50ID0gdmFyaWFudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9kdWN0VmFyaWFudDtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBnZXRQcm9kdWN0QnlWYXJpYW50SWQoaWQ6c3RyaW5nKSA6IFByb2R1Y3RMdWNhIHtcbiAgICAgICAgbGV0IHByb2R1Y3QgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2R1Y3RzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGk8ZWxlbWVudC5nZXRWYXJpYW50cygpLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgdmFyaWFudCA9IGVsZW1lbnQuZ2V0VmFyaWFudHMoKVtpXTtcbiAgICAgICAgICAgICAgICBpZih2YXJpYW50LmdldElkKCkgPT09IGlkKXtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvZHVjdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlTG9jYWxTdG9yYWdlKCk6dm9pZHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjYXJ0QnlMdWNhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvZHVjdHMpKTtcbiAgICB9XG5cbiAgICAgc3RhdGljIGdlbmVyYXRlQ2FydEZyb21Mb2NhbFN0b3JhZ2UoKTpDYXJ0e1xuXG4gICAgICAgIENhcnQuc29ydGVkQ2FydC5wcm9kdWN0cyA9IFtdO1xuXG4gIC8vICAgICAgQ2FydC5nZXRJbnN0YW5jZSgpO1xuXG4gICAgIC8vICAgbGV0IGNhcnQgPSBuZXcgQ2FydCgpO1xuICAgICAgICBsZXQgY2FydEpzbzIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNhcnRCeUx1Y2FcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FydEpzb24gPSBcIiArIEpTT04uc3RyaW5naWZ5KGNhcnRKc28yKSk7XG4gICAgICAgIGlmKGNhcnRKc28yID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgXG4gICAgICAgbGV0IGNhcnRKc29uID0gW107XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgY2FydEpzb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2FydEJ5THVjYVwiKSk7XG4gICAgICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cblxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8Y2FydEpzb24ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGV0IHByb2R1Y3RKc29uID1jYXJ0SnNvbltpXTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocHJvZHVjdEpzb24pO1xuICAgICAgICAgICAgbGV0IHAgPSBuZXcgUHJvZHVjdEx1Y2EoKTtcbiAgICAgICAgICAgIHAuc2V0SWQocHJvZHVjdEpzb24uaWQpO1xuICAgICAgICAgICAgcC5zZXREaXNjb3VudChwcm9kdWN0SnNvbi5kaXNjb3VudCk7XG4gICAgICAgICAgICBwLnNldFByaWNlKHByb2R1Y3RKc29uLnByaWNlKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJtYWluIGltZyBpbnNpZGUganNvbiA9IFwiICsgcHJvZHVjdEpzb24ubWFpbkltYWdlKTtcbiAgICAgICAgICAgIHAubWFpbkltYWdlID0gcHJvZHVjdEpzb24ubWFpbkltYWdlO1xuICAgICAgICAgICAgcC5zZXROYW1lKHByb2R1Y3RKc29uLm5hbWUpO1xuXG4gICAgICAgICAgICBsZXQgaW1hZ2VzSnNvbiA9IHByb2R1Y3RKc29uLmltYWdlcztcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHk8aW1hZ2VzSnNvbi5sZW5ndGg7IHkrKyl7XG4gICAgICAgICAgICAgICAgcC5hZGRJbWFnZShpbWFnZXNKc29uW3ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHZhcmlhbnRzSnNvbiA9IHByb2R1Y3RKc29uLnZhcmlhbnRzO1xuICAgICAgICAgICAgZm9yKGxldCB5ID0gMDsgeTx2YXJpYW50c0pzb24ubGVuZ3RoOyB5Kyspe1xuICAgICAgICAgICAgICAgIGxldCB2YXJpYW50SnNvbiA9IHZhcmlhbnRzSnNvblt5XTtcbiAgICAgICAgICAgICAgICBsZXQgcFZhcmlhbnQgPSBuZXcgUHJvZHVjdFZhcmlhbnQodmFyaWFudEpzb24uaWQsIHZhcmlhbnRKc29uLnNpemUsIHZhcmlhbnRKc29uLmludmVudG9yeSwgdmFyaWFudEpzb24uc2VsZWN0ZWQsIHZhcmlhbnRKc29uLmJhcmNvZGUpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJwVmFyaWFudCA9IFwiICsgcFZhcmlhbnQuZ2V0SnNvbigpKTtcbiAgICAgICAgICAgICAgICBwLnZhcmlhbnRzLnB1c2gocFZhcmlhbnQpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIENhcnQuc29ydGVkQ2FydC5hZGRQcm9kdWN0THVjYShwKTtcblxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcImhvIHRyb3ZhdG8gcXVlc3RvIGNhcnJlbGxvOiBcIiArIEpTT04uc3RyaW5naWZ5KENhcnQuc29ydGVkQ2FydCkpO1xuICAgICAgICByZXR1cm4gQ2FydC5zb3J0ZWRDYXJ0O1xuXG4gICAgfVxuXG4gICAgcHVibGljIGNvbnRhaW5zUHJvZHVjdChwcm9kdWN0OiBQcm9kdWN0THVjYSk6IGJvb2xlYW57XG4gICAgICAgIGxldCBjb250YWlucyA9IGZhbHNlO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwicHJvZHVjdCA9IFwiICsgdGhpcy5nZXRKc29uKCkpO1xuICAgICAgICB0aGlzLnByb2R1Y3RzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZihlbGVtZW50LmdldElkKCkgPT09IHByb2R1Y3QuZ2V0SWQoKSl7XG4gICAgICAgICAgICAgICAgY29udGFpbnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9kdWN0SW5kZXgocHJvZHVjdDogUHJvZHVjdEx1Y2EpOiBudW1iZXJ7XG4gICAgICAgaWYodGhpcy5jb250YWluc1Byb2R1Y3QocHJvZHVjdCkpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaTx0aGlzLnByb2R1Y3RzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnByb2R1Y3RzW2ldLmdldElkKCkgPT0gcHJvZHVjdC5nZXRJZCgpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbFZhcmlhbnRzKCk6IFByb2R1Y3RWYXJpYW50W117XG5cbiAgICAgICAgbGV0IHByb2R1Y3RzVmFyaWFudHM6UHJvZHVjdFZhcmlhbnRbXSA9IFtdO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdHMuZm9yRWFjaChwID0+IHtcblxuICAgICAgICAgICAgcC5nZXRWYXJpYW50cygpLmZvckVhY2godmFyaWFudCA9PiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdHNWYXJpYW50cy5wdXNoKHZhcmlhbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByb2R1Y3RzVmFyaWFudHM7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgZ2V0SXRlbXMoKTogT2JzZXJ2YWJsZTxudW1iZXI+e1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VG90YWxOdW1iZXJPZkl0ZW1zKCkgOiBudW1iZXJ7XG4gICAgICAgIGxldCB0b3RhbDpudW1iZXIgPSAwO1xuICAgICAgICB0aGlzLnByb2R1Y3RzLmZvckVhY2gocCA9PiB7XG5cbiAgICAgICAgICAgIHAuZ2V0VmFyaWFudHMoKS5mb3JFYWNoKHZhcmlhbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRvdGFsICs9IHZhcmlhbnQuZ2V0U2VsZWN0ZWQoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cblxuXG4gICAgcHVibGljIGdldFRvdGFsUHJpY2UoKSA6IG51bWJlcntcbiAgICAgICAgbGV0IHRvdGFsOm51bWJlciA9IDA7XG4gICAgICAgIHRoaXMucHJvZHVjdHMuZm9yRWFjaChwID0+IHtcblxuICAgICAgICAgICAgcC5nZXRWYXJpYW50cygpLmZvckVhY2godmFyaWFudCA9PiB7XG4gICAgICAgICAgICAgICAgdG90YWwgKz0gdmFyaWFudC5nZXRTZWxlY3RlZCgpICogKHAuZ2V0UHJpY2VjKCkgLSBwLmdldERpc2NvdW50KCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cblxuXG4gICAgcHVibGljIGRlbGV0ZVByb2R1Y3RWYXJpYW50KHByb2R1Y3Q6IFByb2R1Y3RWYXJpYW50KSA6IHZvaWR7XG4gICAgICAgIGxldCBwIDogUHJvZHVjdEx1Y2EgPSB0aGlzLmdldFByb2R1Y3RCeVZhcmlhbnRJZChwcm9kdWN0LmdldElkKCkpO1xuICAgICAgICBwLnJlbW92ZVZhcmlhbnQocHJvZHVjdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRvdGFsTnVtYmVyT2ZWYXJpYW50c09mQVNpbmdsZVByb2R1Y3RCeUlkT2ZBVmFyaWFudChpZDpzdHJpbmcpIDogbnVtYmVyIHtcbiAgICAgICAgbGV0IHByb2R1Y3RTaXplID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9kdWN0cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpPGVsZW1lbnQuZ2V0VmFyaWFudHMoKS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IHZhcmlhbnQgPSBlbGVtZW50LmdldFZhcmlhbnRzKClbaV07XG4gICAgICAgICAgICAgICAgaWYodmFyaWFudC5nZXRJZCgpID09PSBpZCl7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RTaXplID0gZWxlbWVudC5nZXRWYXJpYW50cygpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAgcHJvZHVjdFNpemU7XG4gICAgfVxufVxuIl19