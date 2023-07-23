<script setup lang="ts"></script>

<template>
  <h1 class="name">
    <span class="clip">mellow</span>
  </h1>
  <p class="text" style="font-size: 36px">朝辞白帝彩云间，千里江陵一日还。</p>
  <p class="text" style="font-size: 36px">两岸猿声啼不住，轻舟已过万重山。</p>
  <p class="pname" style="font-size: 28px">每天生活好一点</p>
  <p class="tagline" style="font-size: 22px">个人博客，记录java学习的笔记本</p>
</template>

<style scoped>
.name {
  background: -webkit-linear-gradient(
    315deg,
    rgb(210, 86, 53) 10%,
    #647eff 50%,
    rgb(238, 224, 112) 90%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
}

.text {
  background: -webkit-linear-gradient(
    200deg,
    rgb(210, 86, 53) 10%,
    #647eff 50%,
    rgb(238, 224, 112) 90%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
}

.pname {
  background: -webkit-linear-gradient(
    315deg,
    rgb(53, 210, 74) 10%,
    #727a9e 50%,
    rgb(238, 112, 204) 90%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.name,
.text {
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}
.pname {
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}
@media (min-width: 640px) {
  .name,
  .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
  .pname {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}
@media (min-width: 960px) {
  .name,
  .text {
    line-height: 64px;
    font-size: 56px;
  }
  .pname {
    line-height: 64px;
    font-size: 56px;
  }
}

.tagline {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}
@media (min-width: 640px) {
  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .tagline {
    line-height: 36px;
    font-size: 24px;
  }
}
</style>