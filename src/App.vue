<template>
  
       <div class="container">
      <div class="columns">
        <div class="column">
          <div class="box">
            <figure class="image is-32x32">
              <img src="img/sword_icon.png"/>
            </figure>
            New Slash

            <div class="field is-grouped">
              <button class="button">
                Sends
              </button>
              <button class="button">
                Recieves
              </button>
            </div>
            <p>
              Additional Information
            </p>
            

          </div>
        </div>
        <div class="column">
          <div class="box">Two</div>
        </div>
        <div class="column">
          <div class="box">Three</div>
            
          </div>
        <div class="column">
          <div class="box">Four</div></div>
        <div class="column"><div class="box">Five</div></div>
      </div>

      <div class="columns">
        <div class="column notification is-primary">
          Dead Stop
        </div>
        <div class="column notification is-error">
          Down
        </div>
        <div class="column">
          Instant Stop
        </div>
        <div class="column">
          Move
        </div>
        <div class="column">
          Hot
        </div>
        <div class="column">
          Cold
        </div>
        <div class="column">
          Black Out
        </div>
        <div class="column">
          Snow
        </div>
      </div>

      <footer class="footer">
        <p>
           Information presented in this tool was obtained from this document:
          The information from that document is copyright x 2009
        </p>
        
        <p>
          Icons were grabbed from this sprite sheet: 
        </p>

        <p>
          The SaGa series, SaGa frontier and SaGa Frontier remastered are all copywritten to Square Enix
        </p>
      </footer>
    </div>

</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

import {Combo} from './combo/main'

export default {
  name: 'App',
  components: {
    //HelloWorld
  },
  data() {
    return {
      combo: new Combo()
    }
  }
}
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
</style>
