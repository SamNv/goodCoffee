const state = {
  products: [
    {
      name: "Frozen Yogurt",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 6.0,
      price: 4.0,
    },
    {
      name: "Ice cream sandwich",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 9.0,
      price: 4.3,
    },
    {
      name: "Eclair",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 16.0,
      price: 6.0,
    },
    {
      name: "Cupcake",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 3.7,
      price: 4.3,
    },
    {
      name: "Gingerbread",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 16.0,
      price: 3.9,
    },
    {
      name: "Jelly bean",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 0.0,
      price: 0.0,
    },
    {
      name: "Lollipop",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 0.2,
      price: 0,
    },
    {
      name: "Honeycomb",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 3.2,
      price: 6.5,
    },
    {
      name: "Donut",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 25.0,
      price: 4.9,
    },
    {
      name: "KitKat",
      image:
        "https://lh3.googleusercontent.com/proxy/6DFlLNQa_dqZodQh7c7CWuUrJPCoGkMsJ4yOVq0whMdlaAAIQ1lUFQbM_4zi1jhf4LcugkChAZndwL9Sk96MP5Td3YpiFxrYWX_cjJDDLRiFLQ65j-snJKSKFoUPGgcEBOJ0Luv2Z_2yUIoDh8FeuqN7xdiCMn6vm1gGBA",
      discount: 26.0,
      price: 7,
    },
  ]

}

const getters = {
  getProducts(state){
    return state.products
  }
}


const mutations = {

}

const actions = {

}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
