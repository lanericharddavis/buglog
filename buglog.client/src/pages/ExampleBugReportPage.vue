<template>
  <div class="example-bug-report-page container-fluid">
    <div class="row">
      <div class="col ml-3 mt-3">
        <p>
          Title:
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1 class="font-bold">
          Bug Report Page
        </h1>
      </div>
      <div class="col">
        <button class="btn btn-outline-danger" title="close this bug">
          Close
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="row ml-3">
          <p>Reported by: </p>
          <h5>Dusty Bottoms</h5>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <p>Status: </p>
          <h5>Open/Closed Status</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <img class="creator-img ml-3" src="//placehold.it/100x100/" alt="">
      </div>
      <div class="col-md-10">
        <p class="outline p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit magni voluptatum modi corporis fugiat. Perspiciatis, nostrum tempora possimus illum illo asperiores, architecto facere eum iusto earum officiis! Cum nisi itaque repellat tempore ipsum. Quo repudiandae velit iusto dolorem sapiente excepturi eaque unde, obcaecati pariatur nulla? Molestias corporis provident ab, perspiciatis itaque vero commodi animi libero error delectus perferendis temporibus minus labore dolor velit ipsam. Natus mollitia ducimus earum, laboriosam facilis magnam obcaecati a aspernatur tenetur cum. Consectetur id ipsa eos totam inventore nulla enim sed saepe molestias dolorem perferendis odio earum in adipisci dolorum ex, ut aspernatur, sapiente obcaecati nihil?
        </p>
      </div>
    </div>
    <div class="row pt-5 pb-2">
      <div class="col">
        <h5>Notes</h5>
      </div>
      <div class="col">
        <button class="btn btn-outline-success" title="add note">
          Add
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col p-3">
        <table class="outline">
          <tr>
            <th class="notes-image-width">
              Image
            </th>
            <th class="notes-name-width">
              Name
            </th>
            <th class="notes-message-width">
              Message
            </th>
            <th class="notes-delete-width">
              Delete
            </th>
          </tr>
          <tr>
            <td>
              <img src="//placehold.it/100x100" alt="">
            </td>
            <td>
              Alfreds Futterkiste
            </td>
            <td>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dicta blanditiis inventore itaque ipsam unde voluptatum nesciunt eaque laudantium maxime mollitia, ea ducimus aspernatur. Rem!
            </td>
            <td class="text-center">
              <i class="fas fa-trash" title="delete note"></i>
            </td>
          </tr>
          <tr>
            <td>
              <img src="//placehold.it/100x100" alt="">
            </td>
            <td>
              Centro comercial Moctezuma
            </td>
            <td>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis eligendi accusamus nulla, modi quisquam qui!
            </td>
            <td class="text-center">
              <i class="fas fa-trash" title="delete note"></i>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleBugReportPage',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.creator-img{
  border-radius: 50%;
}

.outline{
  outline: 1px solid black;
}

.notes-image-width{
  width: 10%;
}

.notes-name-width{
  width:20%;
}

.notes-message-width{
  width:75%;
}

.notes-delete-width{
  width:10%;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  border: 1px solid #dddddd;
  text-align: left;
  font-size: 1.5rem;
  padding: 15px;
}

td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.font-bold{
  font-weight: 800;
}
</style>
