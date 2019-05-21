'use strict';

module.exports = (app) => {
  const { Joi } = app;
  return {
    obj: Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
    }),
    list: Joi.array().items(
      Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.number().required(),
      }),
    ),
  };
};
