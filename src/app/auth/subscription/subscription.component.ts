import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubscriptionComponent {
  tabs: MenuItem[] = [{ label: 'Monthly' }, { label: 'Annually' }];
  activeItem = this.tabs[0];
  placeOrder: boolean = false;
  subscriptionPurchased: boolean = false;

  subscriptions: { label: string; price: string | number }[] = [
    { label: 'Free', price: 'FREE' },
    { label: 'Basic Service', price: 20 },
    { label: 'Pro Service', price: 100 },
    { label: 'Dedicated Service', price: 250 },
    { label: 'Self-Hosted Server', price: 500 },
  ];
  selectedSubcription = this.subscriptions[0];

  services = [
    {
      title: 'Pro Service',
      description:
        'The Pro Level of expands on the Basic level of service with even more capacity',
      perks: [
        'Multi-Tenat Server',
        '500 Tags (Per Project)',
        'Unlimited Tag Lifetimes',
        'Public & Private Data',
        '20 Public Visitors',
        '20 Private Users',
        '5 Project of Any Type',
        'Full Customization',
        'Robust Admin Tools',
      ],
    },
  ];
  selectedService = this.services[0];

  paymentMethods = [
    'assets/images/Visa.png',
    'assets/images/Paypal.png',
    'assets/images/ApplePay.png',
    'assets/images/GooglePay.png',
  ];
  selectedPaymentMethod = this.paymentMethods[0];

  constructor(private router: Router) {}

  isNumber(number: number | string) {
    return typeof number === 'number';
  }

  setSelectedPayment(index: number) {
    this.selectedPaymentMethod = this.paymentMethods[index];
  }

  setActiveTab(item: MenuItem) {
    this.activeItem = item;
  }

  completePurchase() {
    this.placeOrder = false;
    this.subscriptionPurchased = !this.subscriptionPurchased;
  }

  goToMain(){
    this.router.navigate(['main/dashboard'])
  }

  toggleModal() {
    this.placeOrder = !this.placeOrder;
  }
}
