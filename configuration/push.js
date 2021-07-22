const OneSignal = require('onesignal-node');

class Push {
    constructor(){
        this.client = new OneSignal.Client(process.env.ONESIGNAL_APP_ID, process.env.ONESIGNAL_API_KEY);
    }

    async sendPush(notification) {
        // const notification = {
        //     contents: {
        //       'tr': 'Yeni bildirim',
        //       'en': 'New notification',
        //     },
        //     included_segments: ['Subscribed Users'],
        //     filters: [
        //       { field: 'tag', key: 'level', relation: '>', value: 10 }
        //     ]
        // };
          try {
            const response = await this.client.createNotification(notification);
            return response.body.id;
          } catch (e) {
            if (e instanceof OneSignal.HTTPError) {
              // When status code of HTTP response is not 2xx, HTTPError is thrown.
              console.log(e.statusCode);
              console.log(e.body);
              const error = new Error('push notification error');
              error.statusCode = 500;
              return error;
            }
          }
    }
}

module.exports = Push;