<template>
	<div class="carousel-3d-slide" :style="slideStyle" :class="computedClasses" @click="goTo()">
		<slot :index="index" :isCurrent="isCurrent" :leftIndex="leftIndex" :rightIndex="rightIndex"/>
	</div>
</template>

<script src="./Slide.js" />
<style scoped lang="scss" src="./Slide.scss" />
