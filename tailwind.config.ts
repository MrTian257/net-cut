import type {Config} from 'tailwindcss';
import daisyui from "daisyui";

export default <Partial<Config>>{
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
