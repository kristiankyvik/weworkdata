import React from 'react';

class SubscribeBox extends React.Component {
  render() {
    return (
      <div className="subscribe square">
        <div id="mc_embed_signup">
          <form
            action="//boargundy.us12.list-manage.com/subscribe/post?u=b1cf94ff970c05a33e5f2a29f&amp;id=fa00e4137c"
            method="post" id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div id="mc_embed_signup_scroll">
              <h2>
                Subscribe to our mailing list
              </h2>
              <p>
                Stay tuned and get weekly updates on the lastest data science jobs
              </p>
              <div className="mc-field-group">
                <input
                  placeholder="Email Address"
                  type="email"
                  value=""
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                />
              </div>
              <div
                id="mce-responses"
                className="clear"
              >
              <div
                className="response"
                id="mce-error-response"
                styles="display:none">
              </div>
              <div
                className="response"
                id="mce-success-response"
                styles="display:none">
              </div>
              </div>
              <div className="clear">
                <button type="submit"
                  name="submitButton"
                  value="Subscribe"
                  id="mc-embedded-subscribe"
                  className="btn">
                    <i className="fa fa-rss"></i>
                    Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SubscribeBox
