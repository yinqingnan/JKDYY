<template>
    <div>
        <vue-particles
            color="#dedede"
            :particleOpacity="0.4"
            :particlesNumber="80"
            shapeType="polygon"
            :particleSize="4"
            linesColor="#FFFFFF"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="cash"
            >
        </vue-particles>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
.cash{
    position:fixed;
    top:0;
    width:100%;
}
    


</style>