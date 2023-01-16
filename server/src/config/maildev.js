if(process.env.NODE_ENV=== 'development'){
  async function startMailDev (){
      const {default: Maildev} = await import('maildev')
      const maildev = new Maildev({
          basePathName: '/maildev'
      })
      maildev.listen((err, data)=> {
          if(err) return console.log(`🚨 Failed to load maildev : ${e}`)
          return console.log(`✅ Maildev server listening check your inbox at http://localhost:1080/#/`)
      })
  }
  startMailDev()
}