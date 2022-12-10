import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
//import { environment } from '@env/environment';
export class OrdersService {
    constructor(http, environment) {
        this.http = http;
        this.environment = environment;
        this.apiURLOrders = this.environment.apiURL + 'orders';
        this.apiURLProducts = +this.environment.apiURL + 'products';
        this.apiUrlW_Products = +this.environment.apiURL + 'women-products';
    }
    getOrders() {
        return this.http.get(this.apiURLOrders);
    }
    getOrdersDoneByUser() {
        let data = this.parseJwt(sessionStorage.getItem("authToken"));
        const headers = new HttpHeaders().append('header', 'value');
        const params = new HttpParams().append('userId', data.userId);
        console.log("user id = " + data.userId);
        console.log("data =  " + JSON.stringify(data));
        return this.http.get(this.apiURLOrders + "/byUser/" + data.userId);
    }
    payPal(s) {
        return this.http.post("http://localhost:3000" + "/api/v1/paypal", {});
    }
    getOrder(orderId) {
        return this.http.get(`${this.apiURLOrders}/${orderId}`);
    }
    createOrder(order) {
        return this.http.post(this.apiURLOrders, order);
    }
    createNewOrder(order, email, prefix) {
        console.log("uso questo prefisso: " + prefix);
        return this.http.post(`${this.apiURLOrders}/createNewOrder`, { order, email, prefix });
    }
    getUnconfirmedOrder(prefix, phone) {
        let fullNumber = prefix + phone;
        return this.http.post(`${this.apiURLOrders}/findUnconfirmedOrders`, { fullNumber: fullNumber });
    }
    updateOrder(orderStatus, orderId) {
        return this.http.put(`${this.apiURLOrders}/${orderId}`, orderStatus);
    }
    deleteOrder(orderId) {
        return this.http.post(`${this.apiURLOrders}/delete`, { orderId: orderId });
    }
    getOrdersCount() {
        return this.http
            .get(`${this.apiURLOrders}/get/count`)
            .pipe(map((objectValue) => objectValue.orderCount));
    }
    getTotalSales() {
        return this.http
            .get(`${this.apiURLOrders}/get/totalsales`)
            .pipe(map((objectValue) => objectValue.totalsales));
    }
    getProduct(productId) {
        return this.http.get(`${this.apiURLProducts}/${productId}`);
    }
    getWProduct(productId) {
        return this.http.get(`${this.apiUrlW_Products}/${productId}`);
    }
    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
    ;
}
OrdersService.ɵfac = function OrdersService_Factory(t) { return new (t || OrdersService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject('environment')); };
OrdersService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OrdersService, factory: OrdersService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrdersService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                type: Inject,
                args: ['environment']
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL29yZGVycy9zcmMvbGliL3NlcnZpY2VzL29yZGVycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTNFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSXJDLGlEQUFpRDtBQUtqRCxNQUFNLE9BQU8sYUFBYTtJQVN4QixZQUFvQixJQUFnQixFQUF5QixXQUFXO1FBQXBELFNBQUksR0FBSixJQUFJLENBQVk7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsR0FBSSxDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFFLFVBQVUsQ0FBQztRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUksQ0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRSxnQkFBZ0IsQ0FBQztJQUN2RSxDQUFDO0lBRUEsU0FBUztRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxtQkFBbUI7UUFDakIsSUFBSSxJQUFJLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFL0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxF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ZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vbW9kZWxzL29yZGVyJztcblxuXG4vL2ltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnQGVudi9lbnZpcm9ubWVudCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyc1NlcnZpY2Uge1xuICBwcml2YXRlIGFwaVVSTE9yZGVycyA7XG4gIHByaXZhdGUgYXBpVVJMUHJvZHVjdHM7XG4gIHByaXZhdGUgYXBpVXJsV19Qcm9kdWN0cyA7XG4gIHByaXZhdGUgZW52aXJvbm1lbnQ7XG5cblxuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KCdlbnZpcm9ubWVudCcpIGVudmlyb25tZW50KSB7XG4gICAgdGhpcy5lbnZpcm9ubWVudCA9IGVudmlyb25tZW50O1xuICAgIHRoaXMuYXBpVVJMT3JkZXJzID0gIHRoaXMuZW52aXJvbm1lbnQuYXBpVVJMICsgJ29yZGVycyc7XG4gICAgdGhpcy5hcGlVUkxQcm9kdWN0cyA9ICArIHRoaXMuZW52aXJvbm1lbnQuYXBpVVJMICsncHJvZHVjdHMnO1xuICAgIHRoaXMuYXBpVXJsV19Qcm9kdWN0cyA9ICArIHRoaXMuZW52aXJvbm1lbnQuYXBpVVJMKyAnd29tZW4tcHJvZHVjdHMnO1xuICB9XG5cbiAgIGdldE9yZGVycygpOiBPYnNlcnZhYmxlPE9yZGVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxPcmRlcltdPih0aGlzLmFwaVVSTE9yZGVycyk7XG4gIH1cbiAgZ2V0T3JkZXJzRG9uZUJ5VXNlcigpOiBPYnNlcnZhYmxlPE9yZGVyW10+IHtcbiAgICBsZXQgZGF0YSA9ICB0aGlzLnBhcnNlSnd0KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhdXRoVG9rZW5cIikpO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLmFwcGVuZCgnaGVhZGVyJywgJ3ZhbHVlJyk7XG4gICAgY29uc3QgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5hcHBlbmQoJ3VzZXJJZCcsIGRhdGEudXNlcklkKTtcblxuICAgIGNvbnNvbGUubG9nKFwidXNlciBpZCA9IFwiICArIGRhdGEudXNlcklkKTtcblxuICAgICAgY29uc29sZS5sb2coXCJkYXRhID0gIFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE9yZGVyW10+KHRoaXMuYXBpVVJMT3JkZXJzK1wiL2J5VXNlci9cIiArIGRhdGEudXNlcklkKTtcbiAgfVxuXG4gIHBheVBhbChzOnN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIisgXCIvYXBpL3YxL3BheXBhbFwiLHt9KTtcbiAgfVxuXG5cbiAgZ2V0T3JkZXIob3JkZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxPcmRlcj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE9yZGVyPihgJHt0aGlzLmFwaVVSTE9yZGVyc30vJHtvcmRlcklkfWApO1xuICB9XG5cbiAgY3JlYXRlT3JkZXIob3JkZXI6IE9yZGVyKTogT2JzZXJ2YWJsZTxPcmRlcj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxPcmRlcj4odGhpcy5hcGlVUkxPcmRlcnMsIG9yZGVyKTtcbiAgfVxuXG4gIGNyZWF0ZU5ld09yZGVyKG9yZGVyOiBPcmRlciwgZW1haWw6IHN0cmluZywgcHJlZml4OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnNvbGUubG9nKFwidXNvIHF1ZXN0byBwcmVmaXNzbzogXCIgKyBwcmVmaXgpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PE9yZGVyPihgJHt0aGlzLmFwaVVSTE9yZGVyc30vY3JlYXRlTmV3T3JkZXJgLCB7b3JkZXIsIGVtYWlsLCBwcmVmaXh9KTtcbiAgfVxuXG5cbiAgZ2V0VW5jb25maXJtZWRPcmRlcihwcmVmaXg6YW55LCBwaG9uZTphbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgbGV0IGZ1bGxOdW1iZXIgPSBwcmVmaXggKyBwaG9uZTtcblxuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy5hcGlVUkxPcmRlcnN9L2ZpbmRVbmNvbmZpcm1lZE9yZGVyc2AsIHtmdWxsTnVtYmVyOmZ1bGxOdW1iZXJ9KTtcbiAgfVxuXG4gIHVwZGF0ZU9yZGVyKG9yZGVyU3RhdHVzOiB7IHN0YXR1czogc3RyaW5nIH0sIG9yZGVySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8T3JkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dDxPcmRlcj4oYCR7dGhpcy5hcGlVUkxPcmRlcnN9LyR7b3JkZXJJZH1gLCBvcmRlclN0YXR1cyk7XG4gIH1cblxuICBkZWxldGVPcmRlcihvcmRlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMuYXBpVVJMT3JkZXJzfS9kZWxldGVgLCB7b3JkZXJJZDogb3JkZXJJZH0pO1xuICB9XG5cbiAgZ2V0T3JkZXJzQ291bnQoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PG51bWJlcj4oYCR7dGhpcy5hcGlVUkxPcmRlcnN9L2dldC9jb3VudGApXG4gICAgICAucGlwZShtYXAoKG9iamVjdFZhbHVlOiBhbnkpID0+IG9iamVjdFZhbHVlLm9yZGVyQ291bnQpKTtcbiAgfVxuXG4gIGdldFRvdGFsU2FsZXMoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PG51bWJlcj4oYCR7dGhpcy5hcGlVUkxPcmRlcnN9L2dldC90b3RhbHNhbGVzYClcbiAgICAgIC5waXBlKG1hcCgob2JqZWN0VmFsdWU6IGFueSkgPT4gb2JqZWN0VmFsdWUudG90YWxzYWxlcykpO1xuICB9XG5cbiAgZ2V0UHJvZHVjdChwcm9kdWN0SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmFwaVVSTFByb2R1Y3RzfS8ke3Byb2R1Y3RJZH1gKTtcbiAgfVxuXG4gIGdldFdQcm9kdWN0KHByb2R1Y3RJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+e1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5hcGlVcmxXX1Byb2R1Y3RzfS8ke3Byb2R1Y3RJZH1gKTtcbiAgfVxuXG5cbiAgcGFyc2VKd3QgKHRva2VuKSB7XG4gICAgdmFyIGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgdmFyIGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xuICAgIHZhciBqc29uUGF5bG9hZCA9IGRlY29kZVVSSUNvbXBvbmVudCh3aW5kb3cuYXRvYihiYXNlNjQpLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgfSkuam9pbignJykpO1xuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoanNvblBheWxvYWQpO1xufTtcblxuXG59XG4iXX0=