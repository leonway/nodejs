const { get, update } = require("../../../05/restful/framework/api")

module.exports = {
    async init(ctx,next){
        const model = ctx.app.$model[ctx.params.list]
        if(model){
            ctx.list = model
            await next()
        }else{
            ctx.body = 'no this model'
        }
    },
    async list(ctx, next){
        ctx.body = await  ctx.list.find({})
    },
    async get(ctx,next){
        ctx.body = await ctx.list.findOne({_id:ctx.params.id})
    },
    async create(ctx,next){
        const res = await ctx.list.create(ctx.request.body)
        ctx.body = res
    },
    async update(ctx,next){
        const res = await ctx.list.updateOne({_id:ctx.params.id})
        ctx.body = res
    },
    async del(ctx){
        const res = await ctx.list.deleteOne({ _id:ctx.params.id })
        ctx.body = res
    },
    async page(ctx){
        console.log('page...',ctx.params.page);
        ctx.body = await ctx.list.find({})
    }
}
