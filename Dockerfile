FROM registry.cn-hangzhou.aliyuncs.com/weidian-lab/crm-device-center:base-1.0.0

WORKDIR /root/

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --no-cache --production

RUN rm -rf app.js app config

COPY app.js .
COPY app app
COPY config config

EXPOSE 7001
CMD  npm start
