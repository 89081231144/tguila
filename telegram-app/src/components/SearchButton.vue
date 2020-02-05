<template>
  <div class="searchButton-container">

  <div class="searchButton">

    <div class="searchButton__circle"></div>
    <div class="searchButton__rectangle"></div>
</div>
</div>

</template>
<script>
</script>

<style lang="scss">
@import '~@/_variables.scss';
.searchButton-container{
  background-color: $railEdgeColor;
padding: $buttonBoxSlotBorder;
height: $searchFieldHeight;
}
.searchButton-container-margin{
  margin: $buttonBoxSlotBorder;
}
 .searchButton{
   background-color: $gapBetweenSkewBordersColor;
   position: relative;
   width: $searchFieldHeight - ($buttonBoxSlotBorder*2);
   height: 100%;
   padding: $skewBorderHeight/10;
	position: relative;
	//width: 1.5em;
//margin: 0 auto;
	//padding: 5px 0;
	//text-align: center;

	&__circle {
		width: $gapBetweenSkewBorders+0.4em;
		height: $gapBetweenSkewBorders+0.4em;
		border: $buttonBoxSlotBorder solid $railEdgeColor;
		border-radius: $gapBetweenSkewBorders+0.4em;
	}

	&__rectangle {
		position: relative;
		left: calc(100% - 0.84em);
		bottom: $buttonBoxSlotBorder;
		width: $skewBorderHeight;
		transform: rotate(45deg);
    background-color:$railEdgeColor;
		border: $buttonBoxSlotBorder solid $railEdgeColor;
		border-top-right-radius: $buttonBoxSlotBorder;
		border-bottom-right-radius: $buttonBoxSlotBorder;
	}
}
</style>
