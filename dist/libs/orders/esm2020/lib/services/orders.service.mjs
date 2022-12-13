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
        let data = this.parseJwt(localStorage.getItem("authToken"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL29yZGVycy9zcmMvbGliL3NlcnZpY2VzL29yZGVycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTNFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSXJDLGlEQUFpRDtBQUtqRCxNQUFNLE9BQU8sYUFBYTtJQVN4QixZQUFvQixJQUFnQixFQUF5QixXQUFXO1FBQXBELFNBQUksR0FBSixJQUFJLENBQVk7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsR0FBSSxDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFFLFVBQVUsQ0FBQztRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUksQ0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRSxnQkFBZ0IsQ0FBQztJQUN2RSxDQUFDO0lBRUEsU0FBUztRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxtQkFBbUI7UUFDakIsSUFBSSxJQUFJLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFN0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxF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ZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vbW9kZWxzL29yZGVyJztcblxuXG4vL2ltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnQGVudi9lbnZpcm9ubWVudCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyc1NlcnZpY2Uge1xuICBwcml2YXRlIGFwaVVSTE9yZGVycyA7XG4gIHByaXZhdGUgYXBpVVJMUHJvZHVjdHM7XG4gIHByaXZhdGUgYXBpVXJsV19Qcm9kdWN0cyA7XG4gIHByaXZhdGUgZW52aXJvbm1lbnQ7XG5cblxuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KCdlbnZpcm9ubWVudCcpIGVudmlyb25tZW50KSB7XG4gICAgdGhpcy5lbnZpcm9ubWVudCA9IGVudmlyb25tZW50O1xuICAgIHRoaXMuYXBpVVJMT3JkZXJzID0gIHRoaXMuZW52aXJvbm1lbnQuYXBpVVJMICsgJ29yZGVycyc7XG4gICAgdGhpcy5hcGlVUkxQcm9kdWN0cyA9ICArIHRoaXMuZW52aXJvbm1lbnQuYXBpVVJMICsncHJvZHVjdHMnO1xuICAgIHRoaXMuYXBpVXJsV19Qcm9kdWN0cyA9ICArIHRoaXMuZW52aXJvbm1lbnQuYXBpVVJMKyAnd29tZW4tcHJvZHVjdHMnO1xuICB9XG5cbiAgIGdldE9yZGVycygpOiBPYnNlcnZhYmxlPE9yZGVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxPcmRlcltdPih0aGlzLmFwaVVSTE9yZGVycyk7XG4gIH1cbiAgZ2V0T3JkZXJzRG9uZUJ5VXNlcigpOiBPYnNlcnZhYmxlPE9yZGVyW10+IHtcbiAgICBsZXQgZGF0YSA9ICB0aGlzLnBhcnNlSnd0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYXV0aFRva2VuXCIpKTtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5hcHBlbmQoJ2hlYWRlcicsICd2YWx1ZScpO1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCkuYXBwZW5kKCd1c2VySWQnLCBkYXRhLnVzZXJJZCk7XG5cbiAgICBjb25zb2xlLmxvZyhcInVzZXIgaWQgPSBcIiAgKyBkYXRhLnVzZXJJZCk7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiZGF0YSA9ICBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxPcmRlcltdPih0aGlzLmFwaVVSTE9yZGVycytcIi9ieVVzZXIvXCIgKyBkYXRhLnVzZXJJZCk7XG4gIH1cblxuICBwYXlQYWwoczpzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIrIFwiL2FwaS92MS9wYXlwYWxcIix7fSk7XG4gIH1cblxuXG4gIGdldE9yZGVyKG9yZGVySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8T3JkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxPcmRlcj4oYCR7dGhpcy5hcGlVUkxPcmRlcnN9LyR7b3JkZXJJZH1gKTtcbiAgfVxuXG4gIGNyZWF0ZU9yZGVyKG9yZGVyOiBPcmRlcik6IE9ic2VydmFibGU8T3JkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8T3JkZXI+KHRoaXMuYXBpVVJMT3JkZXJzLCBvcmRlcik7XG4gIH1cblxuICBjcmVhdGVOZXdPcmRlcihvcmRlcjogT3JkZXIsIGVtYWlsOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zb2xlLmxvZyhcInVzbyBxdWVzdG8gcHJlZmlzc286IFwiICsgcHJlZml4KTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxPcmRlcj4oYCR7dGhpcy5hcGlVUkxPcmRlcnN9L2NyZWF0ZU5ld09yZGVyYCwge29yZGVyLCBlbWFpbCwgcHJlZml4fSk7XG4gIH1cblxuXG4gIGdldFVuY29uZmlybWVkT3JkZXIocHJlZml4OmFueSwgcGhvbmU6YW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgIGxldCBmdWxsTnVtYmVyID0gcHJlZml4ICsgcGhvbmU7XG5cblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMuYXBpVVJMT3JkZXJzfS9maW5kVW5jb25maXJtZWRPcmRlcnNgLCB7ZnVsbE51bWJlcjpmdWxsTnVtYmVyfSk7XG4gIH1cblxuICB1cGRhdGVPcmRlcihvcmRlclN0YXR1czogeyBzdGF0dXM6IHN0cmluZyB9LCBvcmRlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9yZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8T3JkZXI+KGAke3RoaXMuYXBpVVJMT3JkZXJzfS8ke29yZGVySWR9YCwgb3JkZXJTdGF0dXMpO1xuICB9XG5cbiAgZGVsZXRlT3JkZXIob3JkZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLmFwaVVSTE9yZGVyc30vZGVsZXRlYCwge29yZGVySWQ6IG9yZGVySWR9KTtcbiAgfVxuXG4gIGdldE9yZGVyc0NvdW50KCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxudW1iZXI+KGAke3RoaXMuYXBpVVJMT3JkZXJzfS9nZXQvY291bnRgKVxuICAgICAgLnBpcGUobWFwKChvYmplY3RWYWx1ZTogYW55KSA9PiBvYmplY3RWYWx1ZS5vcmRlckNvdW50KSk7XG4gIH1cblxuICBnZXRUb3RhbFNhbGVzKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxudW1iZXI+KGAke3RoaXMuYXBpVVJMT3JkZXJzfS9nZXQvdG90YWxzYWxlc2ApXG4gICAgICAucGlwZShtYXAoKG9iamVjdFZhbHVlOiBhbnkpID0+IG9iamVjdFZhbHVlLnRvdGFsc2FsZXMpKTtcbiAgfVxuXG4gIGdldFByb2R1Y3QocHJvZHVjdElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5hcGlVUkxQcm9kdWN0c30vJHtwcm9kdWN0SWR9YCk7XG4gIH1cblxuICBnZXRXUHJvZHVjdChwcm9kdWN0SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PntcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYXBpVXJsV19Qcm9kdWN0c30vJHtwcm9kdWN0SWR9YCk7XG4gIH1cblxuXG4gIHBhcnNlSnd0ICh0b2tlbikge1xuICAgIHZhciBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgIHZhciBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcbiAgICB2YXIganNvblBheWxvYWQgPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmF0b2IoYmFzZTY0KS5zcGxpdCgnJykubWFwKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuICclJyArICgnMDAnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIH0pLmpvaW4oJycpKTtcblxuICAgIHJldHVybiBKU09OLnBhcnNlKGpzb25QYXlsb2FkKTtcbn07XG5cblxufVxuIl19