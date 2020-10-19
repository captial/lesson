<template>
  <div class="baner">
    <img src="https://imgs.qunarzz.com/vs_ceph_vcimg/b624dc3e0ae6c90b2908d9726a5aad50.jpeg" />
    <div class="banner-des">
      <div class="des">大连圣亚海洋世界</div>
      <div class="des-img">
        <i class="iconfont icon-search"></i>
        <span>39</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.baner {
  height: 0;
  padding-bottom: 55%;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
  }
  .banner-des {
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0.4rem;
    height: 0.4rem;
    color: #fff;
    .des {
      flex: 1;
      position: relative;
      padding: 0.1rem 0 0 0.2rem;
      font-size: 0.32rem;
    }
    .des-img {
      border-radius: 0.5rem;
      background: rgba(0, 0, 0, 0.8);
      padding: 0rem 0.4rem 0 0.4rem;
    }
  }
}
</style>