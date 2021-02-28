


const Profile = ({username}) => {

    return (
        <>
        <p>full --- {username}</p>
        <p>stripped --- {username.slice(1)}</p>


        </>
    )
}

export async function getServerSideProps(context) {
    console.log(context)
    const { username } = context.query;
    // const cookies = parseCookies(context.req);
    // console.log(id);
    // console.log(cookies);
    try {
    //   const res = await api.get(`network/${id}/`, {
    //     headers: { Authorization: `Token ${cookies.ttk}` },
    //   });
    //   const networks = res.data.network;
    //   const latest = res.data.latest;
      return {
        props: {
          username,
        },
      };
    } catch (err) {
      if (context.res) {
        context.res.writeHead(302, {
          Location: "/404",
        });
        context.res.end();
      }
  
      return {};
    }
  }

  export default Profile;
