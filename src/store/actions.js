
export default {
  updateCart(ctx,payload) {
    ctx.commit('addCart',payload)
  }
}
