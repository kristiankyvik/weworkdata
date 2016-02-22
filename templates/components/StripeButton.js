import React from 'react';
import reactMixin from 'react-mixin';
import {ReactScriptLoaderMixin} from 'react-script-loader';

class StripeButton extends React.Component {
  statics = {
    stripeHandler: null,
    scriptDidError: false
  }

  constructor() {
    super();
    this.hasPendingClick = false;
    this.getScriptURL = this.getScriptURL.bind(this);
    this.onScriptLoaded = this.onScriptLoaded.bind(this);
    this.showStripeDialog = this.showStripeDialog.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onScriptError = this.onScriptError.bind(this);
    this.showLoadingDialog = this.showLoadingDialog.bind(this);
    this.hideLoadingDialog = this.hideLoadingDialog.bind(this);
  }

  getScriptURL() {
    return 'https://checkout.stripe.com/checkout.js';
  }

  onScriptLoaded() {
    if (!StripeButton.stripeHandler) {
      StripeButton.stripeHandler = StripeCheckout.configure({
        key: 'pk_test_vPdZ6gYcL8KBa2JQxv5erZGo',
        image: '/static/pics/logo-blue.png'
      });
      if (this.hasPendingClick) {
          this.showStripeDialog();
      }
    }
  }

  showStripeDialog() {
    this.hideLoadingDialog();
    StripeButton.stripeHandler.open({
            name: 'Demo Site',
            description: '2 widgets ($20.00)',
            amount: 2000
        });
  }

  onScriptError() {
    this.hideLoadingDialog();
    StripeButton.scriptDidError = true;
  }

  onClick() {
    var that
    if (StripeButton.scriptDidError) {
    } else if (StripeButton.stripeHandler) {
      this.showStripeDialog();
    } else {
      this.showLoadingDialog();
      this.hasPendingClick = true;
    }
  }

  render() {
    return (
      <button type="button" onClick={this.onClick}>
        Place order
      </button>
    )
  }
}

reactMixin(StripeButton.prototype, ReactScriptLoaderMixin);

export default StripeButton
