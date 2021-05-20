var eventBus = new Vue()
Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})


Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
      <div class="product">
      <div class="product-image">
        <img v-bind:src="image" />
      </div>
      <a v-bind:href="link">V-bind Link Challenge</a>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
        <p v-if="onSale">{{sale}}</p>
        <p v-else="!onSale">{{nonsale}}</p>
        <p>Shipping: {{ shipping }}</p>
        

        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)">
        </div>

        <ul v-for="size in sizes">
          {{ size }}
        </ul>

        <button v-on:click="addToCart" 
                :disabled="!inStock"
                :class="{disabledButton: !inStock}">Add to card</button>
        <button v-on:click="deleteToCart">Minus Item</button>  
      </div>

      <product-tabs :reviews="reviews"></product-tabs>

      
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      description: 'A pair of warm, fuzzy socks',
      // image: './assets/shoe.png',
      selectedVariant: 0,
      link: 'https://www.google.com/',
      // inStock: true,
      onSale: true,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/shoe.png',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/shoe2.jpg',
          variantQuantity: 0
        }
      ],
      reviews: [],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
     

      nonsale: 'no promotion',

      brand: 'Vue Mastery',
      product: 'on Sale'
      } 
  },

  computed: {
    nonsale(){
      return this.nonsale;
    },
    image(){
      return this.variants[this.selectedVariant].variantImage
    },
    inStock(){
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale(){
      return this.brand + ' ' + this.product;
    },
    shipping(){
      if(this.premium){
        return "Free"
      }
      return 2.99
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  },

  methods: {
    addToCart: function(){
      // this.cart += 1;
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct: function(index){
      this.selectedVariant = index
      this.cart = 0;
    },

    deleteToCart: function(){
      // if(this.cart > 0){
      //   this.cart -= 1;
      // }
      this.$emit('delete-to-cart', this.variants[this.selectedVariant].variantId)
    },

  }
})


Vue.component('product-review', {
  template: `
      <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      


      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>Would you recommend this product?</p>
        <label>
          Yes
          <input type="radio" value="OK" v-model="question"/>
        </label>
        <label>
          No
          <input type="radio" value="Not OK =))" v-model="question"/>
        </label>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    

    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      question: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.question) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          question: this.question
        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null,
        this.review = null,
        this.rating = null,
        this.question = null
      }
      else{
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
        if(!this.question) this.errors.push("Question required.")
      }
    }
  }
})

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>

      <span class="tab" :class="{activeTab: selectedTab === tab}" v-for="(tab, index) in tabs" :key="index" @click="selectedTab = tab">{{ tab }}</span>

      <div v-show="selectedTab === 'Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>

        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>{{ review.review }}</p>
            <p>{{ review.rating }}</p>
          </li>
        </ul>
      </div>

      <product-review v-show="selectedTab === 'Make a Review'"></product-review>
    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: [],
  },
  
  methods: {
    updateCart(id){
      this.cart.push(id)
    },

    removeCart(id){
      this.cart.pop(id)
    }
  }
  // data: {
  //     product: 'Socks',
  //     description: 'A pair of warm, fuzzy socks',
  //     // image: './assets/shoe.png',
  //     selectedVariant: 0,
  //     link: 'https://www.google.com/',
  //     // inStock: true,
  //     onSale: true,
  //     details: ['80% cotton', '20% polyester', 'Gender-neutral'],
  //     variants: [
  //       {
  //         variantId: 2234,
  //         variantColor: 'green',
  //         variantImage: './assets/shoe.png',
  //         variantQuantity: 10
  //       },
  //       {
  //         variantId: 2235,
  //         variantColor: 'blue',
  //         variantImage: './assets/shoe2.jpg',
  //         variantQuantity: 0
  //       }
  //     ],
  //     sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  //     cart: 0,

  //     nonsale: 'no promotion',

  //     brand: 'Vue Mastery',
  //     product: 'on Sale'
  // },

  // computed: {
  //   nonsale(){
  //     return this.nonsale;
  //   },
  //   image(){
  //     return this.variants[this.selectedVariant].variantImage
  //   },
  //   inStock(){
  //     return this.variants[this.selectedVariant].variantQuantity
  //   },
  //   sale(){
  //     return this.brand + ' ' + this.product;
  //   }
  // },


  // methods: {
  //   addToCart: function(){
  //     this.cart += 1;
  //   },
  //   updateProduct: function(index){
  //     this.selectedVariant = index
  //     this.cart = 0;
  //   },

  //   deleteToCart: function(){
  //     if(this.cart > 0){
  //       this.cart -= 1;
  //     }
  //   }
  // }
})