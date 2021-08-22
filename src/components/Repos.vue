<template>
  <v-container class="container">
    <div class="card">
      <div class="card-title">argon-challenge-21</div>
      <div v-for="(repo, index) in repos" :key="index" class="repo">
        <img class="cat-img" src="../assets/Octocat 2.png" />
        <div class="repo-details">
          <div class="repo-name">
            {{ repo.name }}
          </div>
          <div class="visibility">
            {{ repo.visibility ? "Public" : "Private" }}
          </div>
          <div class="protected">
            {{ repo.protected ? "Protected" : "Unprotected" }}
          </div>
          <button class="lock-img" @click="changeStatus(repo)">
            <img v-if="!repo.protected" src="../assets/lock-open-alt.png" />
            <img v-else src="../assets/lock-alt.png" />
          </button>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import repoDL from "@/dl/repoDL";
import { Repo } from "@/types/module";
export default Vue.extend({
  data() {
    return {
      repos: [] as Array<Repo>,
    };
  },
  async created() {
    const res = await repoDL.getRepos();
    this.repos = res;
  },
  methods: {
    async changeStatus(repo: Repo) {
      const res = await repoDL.changeStatus(repo);
      this.repos.forEach((element) => {
        if (element.name === repo.name) element.protected = res.protected;
      });
    },
    repoLock(repo: Repo): string {
      return repo.protected
        ? "../assets/lock-open-alt.png"
        : "../assets/lock-alt.png";
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.card {
  position: absolute;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: start;
  width: 450px;
}
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
.card-title {
  width: 261px;
  height: 32px;
  margin-top: 32px;
  margin-left: 32px;
  margin-right: 82px;
  margin-bottom: 36px;

  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 132%;
  /* identical to box height, or 32px */
  letter-spacing: 0.25px;

  color: #12121f;
}

.cat-img {
  height: 49px;
  width: 61px;
  background: #ffffff;
  border: 1px solid #ffe0d6;
  box-sizing: border-box;
  border-radius: 40px;
  padding: 24px 18px 23px 17px;
  box-sizing: content-box;
  margin-left: 43px;
  margin-right: 29px;
  margin-bottom: 35px;
}

.repo {
  display: flex;
  border-radius: 24px;
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.25px;
  width: 400px;
  padding-top: 5px;
}

.repo:hover {
  background: #fef2ee;
}

.protected {
  align-items: center;
  color: #12121f;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
}

.visibility {
  font-size: 12px;
  line-height: 16px;
  color: #828282;
  margin-bottom: 15px;
}

.repo-name {
  color: #333333;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-top: 22px;
}

.repo-details {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 300px;
}

.lock-img {
  align-self: flex-end;
  border-radius: 24px;
  width: 49px;
  height: 46px;
  padding: 12px 15px 14px 16px;
}

.lock-img:hover {
  background: #fef2ee;
  mix-blend-mode: multiply;
}
</style>
