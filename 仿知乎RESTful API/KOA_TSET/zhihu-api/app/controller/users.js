let db = [{ name: "txm" }, { name: "sin" }]
class UsersCtl {
  find(ctx) {
    ctx.body = db
  };
  findById(ctx) {
    if (ctx.params.id * 1 > db.length - 1) {
      ctx.throw(412, "id不存在")//412先决条件错误
    }
    ctx.body = db[ctx.params.id * 1]
  };
  create(ctx) {
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  };
  update(ctx) {
    db[ctx.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  };
  detele(ctx) {
    db.splice(ctx.params.id * 1, 1)
    ctx.status = 204
  };
}

module.exports = new UsersCtl;