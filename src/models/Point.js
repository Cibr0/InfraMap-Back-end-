import mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
  name: String,
  description: {
    type: String,
    validate: {
      validator: function (value) {
        const regex =
          /^(?!\d+$)[\w\s.,;:!?()"'áéíóúàèìòùâêîôûãõçÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ-]{5,}$/u;
        return regex.test(value);
      },
      message: (props) =>
        `"${props.value}" não é uma descrição válida. Use pelo menos 5 caracteres com palavras ou frases reais.`,
    },
  },
  image: String,
  coordinates: {
    type: [Number],
    index: "2dsphere",
    validate: {
      validator: function (value) {
        return (
          Array.isArray(value) &&
          value.length === 2 &&
          value.every((num) => typeof num === "number") &&
          value[0] >= -180 &&
          value[0] <= 180 && // longitude
          value[1] >= -90 &&
          value[1] <= 90 // latitude
        );
      },
      message: (props) =>
        `${props.value} não é uma coordenada geográfica válida.`,
    },
  },
  userID: String,
});

export default mongoose.model("Point", PointSchema);
