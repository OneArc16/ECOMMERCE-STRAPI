'use strict';
const stripe = require("stripe")("sk_test_51N7PVWDaHQPXeQXaxBrsDTHYl9zXUd2HN5ZRb8HJwxgLKH03DRkzQEGSUqfCNkkc8Z59f2uDmFz7f68MJkCXyPDo00ozM9Smul")

function calcDiscountPrice(price, discount){
  if(!discount) return prince;

  const discountAmount = (price * discount) / 100;
  const result = price - discountAmount;

  return result.toFixed(2)
}

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async paymentOrder(ctx) {
    const {token, products, idUser, addressShipping} = ctx.request.body;

    let totalPayment = 0;
    products.forEach((product) => {
      const princeTemp = calcDiscountPrice(
        product.attributes.price,
        product.attributes.discount
      );
      totalPayment += Number(princeTemp) * product.quantity;
    });

    const charge = await stripe.charges.create({
      amount: Math.round(totalPayment * 100),
      currency: "dolar",
      source: token.id,
      description: `User ID: ${idUser}`
    })

    const data = {
      products,
      user: idUser,
      totalPayment,
      idPayment: charge.id,
      addressShipping,

    };

    const model = strapi.contentTypes["api::order.order"]
    const validData = await strapi.entityValidator.validateEntityCreation(
      model,
      data
    )

    const entry = await strapi.db
    .query["api::order.order"]
    .create({data: validData});
    return entry;
  }
}));
