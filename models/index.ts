('message word chatter channel').split(' ').forEach(function (model) {
    if (model) require('./' + model);
});
