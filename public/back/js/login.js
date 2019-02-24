$(function(){
   /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  //使用表单校验插件
$('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度为2-6位'
          },
        }
      },
      // 密码
      password: {
        // 配置校验规则
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          }
        }
      }
    }
  }); 

  /* 
    2. 使用 submit 按钮, 会进行表单提交, 此时表单校验插件会立刻进行校验
       (1) 校验成功, 此时会默认提交, 发生页面跳转,  注册表单校验成功事件, 在事件中阻止默认的跳转提交, 通过ajax提交
       (2) 校验失败, 自动拦截提交

      注册表单校验成功事件, 在事件中阻止默认的提交, 通过ajax提交
  */

 $("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  // 当前默认表单提交已经被阻止,我们将使用ajax提交逻辑
  $.ajax({
    type:'post',
    url:'/employee/employeeLogin',
    data:$('#form').serialize(),
    dataType:'json',
    success:function(res){
      console.log(res);
      if (res.error ===1000) {
        alert('用户名不存在');
      }
      if (res.error === 1001) {
        alert('密码错误');
      }
      if (res.success) {
        //登录成功
        location.href = 'index.html';
      }
    }
  })
 })
// 3 表单重置
    // reset 按钮本身就可以重置内容,所以只需要重置状态即可
    // resetForm(false);  只重置状态
    // resetForm(true);   重置内容和状态
    $('[type="reset"]').click(function() {
      // 重置状态即可
      $('#form').data('bootstrapValidator').resetForm();
    })




});