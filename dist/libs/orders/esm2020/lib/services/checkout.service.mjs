import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class CheckoutService {
    constructor(http, environment) {
        this.http = http;
        this.environment = environment;
        this.apiURLOrders = this.environment.apiURL + 'orders';
        this.apiURLProducts = +this.environment.apiURL + 'products';
        this.apiUrlW_Products = +this.environment.apiURL + 'women-products';
    }
    makePayment(stripeToken, amount) {
        const url = this.environment.apiURL + "checkout";
        let user = this.parseJwt(sessionStorage.getItem("authToken"));
        console.log("user = " + JSON.stringify(user));
        return this.http.post(url, { token: stripeToken, amount: amount, country: user.country, fName: user.fName, lName: user.lName, address: user.address1, phone: user.phone, state: user.state, postalCode: user.postalCode, city: user.city, email: user.email, prefix: user.prefix });
    }
    sendSms(orderId, clientNumber, clientPrefix) {
        return this.http.post("https://cataldoproduction.herokuapp.com" + "/api/v1/sms/send", { orderId: orderId, clientNumber: clientNumber, clientPrefix: clientPrefix });
    }
    payPal(cart, order2) {
        console.log("chiamo paypal");
        return this.http.post("https://cataldoproduction.herokuapp.com" + "/api/v1/paypal", { amount: cart.getTotalPrice(), order: order2 });
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
CheckoutService.ɵfac = function CheckoutService_Factory(t) { return new (t || CheckoutService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject('environment')); };
CheckoutService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CheckoutService, factory: CheckoutService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckoutService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                type: Inject,
                args: ['environment']
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvb3JkZXJzL3NyYy9saWIvc2VydmljZXMvY2hlY2tvdXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQVFsRCxNQUFNLE9BQU8sZUFBZTtJQU8xQixZQUFvQixJQUFnQixFQUF5QixXQUFXO1FBQXBELFNBQUksR0FBSixJQUFJLENBQVk7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsR0FBSSxDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFFLFVBQVUsQ0FBQztRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUksQ0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRSxnQkFBZ0IsQ0FBQztJQUN2RSxDQUFDO0lBRUQsV0FBVyxDQUFDLFdBQWdCLEVBQUUsTUFBYztRQUMxQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUE7UUFFaEQsSUFBSSxJQUFJLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTlDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU0sR0FBRyxFQUFDLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUN0UixDQUFDO0lBS0QsT0FBTyxDQUFDLE9BQWEsRUFBRSxZQUFrQixFQUFFLFlBQWtCO1FBQzNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU0seUNBQXlDLEdBQUUsa0JBQWtCLEVBQUMsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7SUFDckssQ0FBQztJQUlELE1BQU0sQ0FBQyxJQUFTLEVBQUUsTUFBWTtRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU0seUNBQXlDLEdBQUUsZ0JBQWdCLEVBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7SUFFRCxRQUFRLENBQUUsS0FBSztRQUNiLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RCxJQUFJLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBUyxDQUFDO1lBQzdFLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUFBLENBQUM7OzhFQTlDVyxlQUFlLDBDQU9vQixhQUFhO3FFQVBoRCxlQUFlLFdBQWYsZUFBZSxtQkFGZCxNQUFNO3VGQUVQLGVBQWU7Y0FIM0IsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFRd0MsTUFBTTt1QkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2FydCB9IGZyb20gJ0Blc2hvcC1mcm9udGVuZC91c2Vycyc7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4uL21vZGVscy9vcmRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0U2VydmljZSB7XG5cbiAgcHJpdmF0ZSBhcGlVUkxPcmRlcnMgO1xuICBwcml2YXRlIGFwaVVSTFByb2R1Y3RzO1xuICBwcml2YXRlIGFwaVVybFdfUHJvZHVjdHMgO1xuICBwcml2YXRlIGVudmlyb25tZW50O1xuICBcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KCdlbnZpcm9ubWVudCcpIGVudmlyb25tZW50KSB7XG4gICAgdGhpcy5lbnZpcm9ubWVudCA9IGVudmlyb25tZW50O1xuICAgIHRoaXMuYXBpVVJMT3JkZXJzID0gIHRoaXMuZW52aXJvbm1lbnQuYXBpVVJMICsgJ29yZGVycyc7XG4gICAgdGhpcy5hcGlVUkxQcm9kdWN0cyA9ICArIHRoaXMuZW52aXJvbm1lbnQuYXBpVVJMICsncHJvZHVjdHMnO1xuICAgIHRoaXMuYXBpVXJsV19Qcm9kdWN0cyA9ICArIHRoaXMuZW52aXJvbm1lbnQuYXBpVVJMKyAnd29tZW4tcHJvZHVjdHMnO1xuICB9XG5cbiAgbWFrZVBheW1lbnQoc3RyaXBlVG9rZW46IGFueSwgYW1vdW50OiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgY29uc3QgdXJsID0gdGhpcy5lbnZpcm9ubWVudC5hcGlVUkwgKyBcImNoZWNrb3V0XCJcblxuICAgIGxldCB1c2VyID0gIHRoaXMucGFyc2VKd3Qoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImF1dGhUb2tlblwiKSk7XG5cbiAgICBjb25zb2xlLmxvZyhcInVzZXIgPSBcIiArIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KHVybCx7dG9rZW46c3RyaXBlVG9rZW4sIGFtb3VudDogYW1vdW50LCBjb3VudHJ5OiB1c2VyLmNvdW50cnksIGZOYW1lOiB1c2VyLmZOYW1lLCBsTmFtZTogdXNlci5sTmFtZSwgYWRkcmVzczogdXNlci5hZGRyZXNzMSwgcGhvbmU6IHVzZXIucGhvbmUsc3RhdGU6IHVzZXIuc3RhdGUsIHBvc3RhbENvZGU6IHVzZXIucG9zdGFsQ29kZSwgY2l0eTogdXNlci5jaXR5LCBlbWFpbDogdXNlci5lbWFpbCwgcHJlZml4OiB1c2VyLnByZWZpeH0pO1xuICB9XG5cblxuXG5cbiAgc2VuZFNtcyhvcmRlcklkIDogYW55LCBjbGllbnROdW1iZXIgOiBhbnksIGNsaWVudFByZWZpeCA6IGFueSkgOiBPYnNlcnZhYmxlPGFueT57XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oXCJodHRwczovL2NhdGFsZG9wcm9kdWN0aW9uLmhlcm9rdWFwcC5jb21cIisgXCIvYXBpL3YxL3Ntcy9zZW5kXCIse29yZGVySWQ6b3JkZXJJZCwgY2xpZW50TnVtYmVyOiBjbGllbnROdW1iZXIsIGNsaWVudFByZWZpeDpjbGllbnRQcmVmaXh9KTtcbiAgfVxuXG5cblxuICBwYXlQYWwoY2FydDpDYXJ0LCBvcmRlcjI6T3JkZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnNvbGUubG9nKFwiY2hpYW1vIHBheXBhbFwiKVxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KFwiaHR0cHM6Ly9jYXRhbGRvcHJvZHVjdGlvbi5oZXJva3VhcHAuY29tXCIrIFwiL2FwaS92MS9wYXlwYWxcIix7YW1vdW50OmNhcnQuZ2V0VG90YWxQcmljZSgpLCBvcmRlcjpvcmRlcjJ9KTtcbiAgfVxuXG4gIHBhcnNlSnd0ICh0b2tlbikge1xuICAgIHZhciBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgIHZhciBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcbiAgICB2YXIganNvblBheWxvYWQgPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmF0b2IoYmFzZTY0KS5zcGxpdCgnJykubWFwKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuICclJyArICgnMDAnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIH0pLmpvaW4oJycpKTtcblxuICAgIHJldHVybiBKU09OLnBhcnNlKGpzb25QYXlsb2FkKTtcbn07XG59XG4iXX0=