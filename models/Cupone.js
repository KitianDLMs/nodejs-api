import mongoose, { Schema } from 'mongoose';

const CuponeSchema = new Schema({
    code: { type: String, maxLength: 50, required: true },
    type_discount: { type: Number, required: true, default: 1 }, // por moneda: 1 o porcentaje: 2
    discount: { type: Number, required: true },
    type_count: { type: Number, required: true, default: 1 }, // ilimitado: 1 o limitado: 2
    num_use: { type: Number, required: false },
    type_segment: { type: Number, required: false, default: 1 }, // 1 cupon por producto 2 por categoria
    state:{ type:Number, required:false, default: 1},//1 es activo
    products: [  ],
    categories: [  ],

},{
    timestamps: true
});

const Cupone = mongoose.model("cupones", CuponeSchema);
export default Cupone;