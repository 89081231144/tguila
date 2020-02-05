FROM debian:jessie
RUN apt-get update && apt-get install -y cron bash wget
RUN mkdir -p /webroots/tguila.com/.well-known && mkdir -p /scripts
WORKDIR /scripts
RUN wget https://dl.eff.org/certbot-auto
RUN chmod a+x ./certbot-auto
RUN /scripts/certbot-auto -n certificates
RUN touch register && echo "#!/bin/sh" > register && echo "/scripts/certbot-auto certonly --webroot -w /webroots/tguila.com -d www.tguila.com -d tguila.com" > register
VOLUME /webroots
VOLUME /etc/letsencrypt
RUN echo "22 03 * * 2,7 root /scripts/certbot-auto renew" > /etc/cron.d/certbot
CMD [ "cron", "-f" ]
