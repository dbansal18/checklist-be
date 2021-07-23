module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        checked: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Checklist = mongoose.model("checklist", schema);
    return Checklist;
};