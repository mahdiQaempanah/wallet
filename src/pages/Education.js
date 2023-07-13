// /* eslint-disable max-classes-per-file */
// /* eslint-disable react/no-multi-comp */

// import PropTypes from 'prop-types'
// import React, { Component } from 'react'
// import {
//   Button,
//   Container,
//   Divider,
//   Grid,
//   Header,
//   Icon,
//   Image,
//   List,
//   Menu,
//   Segment,
//   Dropdown,
//   Embed,
// } from 'semantic-ui-react'
// import edu from '../assets/images/edu.jpeg'

// const fullname = 'ابوالفضل سلطانی'

// const Education = () => (
//   <div>
//     <Menu fixed='top' inverted>
//       <Container>
//         <Menu.Item as='a' header>
//           {fullname}
//           <Image circular size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' style={{ marginRight: '1.5em' }} />
//         </Menu.Item>
//         <Menu.Item as='a'>Home</Menu.Item>

//         <Dropdown item simple text='Dropdown'>
//           <Dropdown.Menu>
//             <Dropdown.Item>List Item</Dropdown.Item>
//             <Dropdown.Item>List Item</Dropdown.Item>
//             <Dropdown.Divider />
//             <Dropdown.Header>Header Item</Dropdown.Header>
//             <Dropdown.Item>
//               <i className='dropdown icon' />
//               <span className='text'>Submenu</span>
//               <Dropdown.Menu>
//                 <Dropdown.Item>List Item</Dropdown.Item>
//                 <Dropdown.Item>List Item</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown.Item>
//             <Dropdown.Item>List Item</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </Container>
//     </Menu>

//     <Container>
//       <Segment style={{ padding: '8em 0em' }} vertical>
//         <Grid container stackable verticalAlign='middle'>
//           <Grid.Row>
//             <Grid.Column width={8}>
//               <Header as='h3' style={{ fontSize: '2em' }}>
//                 آموزش مدیریت مالی
//               </Header>
//               <p style={{ fontSize: '1.33em' }}>
//                 در این سایت نه تنها می‌توانید مخارج خود را مدیریت کنید، بلکه می‌توانید با ویدیوهای آموزشی که در اینجا وجود دارد، مدیریت بهتری انجام دهید.
//               </p>
//               <Header as='h3' style={{ fontSize: '2em' }}>
//                 گرگ خیابان وال استریت شوید
//               </Header>
//               <p style={{ fontSize: '1.33em' }}>
//                 ما در اینجا قصد داریم برنامه‌ریزی برای مخارج را هم داشته باشیم.
//               </p>
//             </Grid.Column>
//             <Grid.Column floated='right' width={6}>
//               <Image bordered rounded size='large' src={edu} />
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//       </Segment>
//     </Container>

//     <Segment style={{ padding: '0em' }} vertical>
//       <Grid celled='internally' columns='equal' stackable>
//         <Grid.Row textAlign='center'>
//           <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
//             <Header as='h3' style={{ fontSize: '2em' }}>
//               چگونه پول‌های خود را مدیریت کنیم
//             </Header>
//               <Embed
//                 id='HQzoZfc3GwQ'
//                 // placeholder={edu}
//                 source='youtube'
//               />
//           </Grid.Column>
//           <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
//             <Header as='h3' style={{ fontSize: '2em' }}>
//               "I shouldn't have gone with their competitor."
//             </Header>
//             <p style={{ fontSize: '1.33em' }}>
//               <Image avatar src='/images/avatar/large/nan.jpg' />
//               <b>Nan</b> Chief Fun Officer Acme Toys
//             </p>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </Segment>

//     <Segment style={{ padding: '8em 0em' }} vertical>
//       <Container text>
//         <Header as='h3' style={{ fontSize: '2em' }}>
//           Breaking The Grid, Grabs Your Attention
//         </Header>
//         <p style={{ fontSize: '1.33em' }}>
//           Instead of focusing on content creation and hard work, we have learned how to master the
//           art of doing nothing by providing massive amounts of whitespace and generic content that
//           can seem massive, monolithic and worth your attention.
//         </p>
//         <Button as='a' size='large'>
//           Read More
//         </Button>

//         <Divider
//           as='h4'
//           className='header'
//           horizontal
//           style={{ margin: '3em 0em', textTransform: 'uppercase' }}
//         >
//           <a href='#'>Case Studies</a>
//         </Divider>

//         <Header as='h3' style={{ fontSize: '2em' }}>
//           Did We Tell You About Our Bananas?
//         </Header>
//         <p style={{ fontSize: '1.33em' }}>
//           Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
//           it's really true. It took years of gene splicing and combinatory DNA research, but our
//           bananas can really dance.
//         </p>
//         <Button as='a' size='large'>
//           I'm Still Quite Interested
//         </Button>
//       </Container>
//     </Segment>

//     <Segment inverted vertical style={{ padding: '5em 0em' }}>
//       <Container>
//         <Grid divided inverted stackable>
//           <Grid.Row>
//             <Grid.Column width={3}>
//               <Header inverted as='h4' content='About' />
//               <List link inverted>
//                 <List.Item as='a'>Sitemap</List.Item>
//                 <List.Item as='a'>Contact Us</List.Item>
//                 <List.Item as='a'>Religious Ceremonies</List.Item>
//                 <List.Item as='a'>Gazebo Plans</List.Item>
//               </List>
//             </Grid.Column>
//             <Grid.Column width={3}>
//               <Header inverted as='h4' content='Services' />
//               <List link inverted>
//                 <List.Item as='a'>Banana Pre-Order</List.Item>
//                 <List.Item as='a'>DNA FAQ</List.Item>
//                 <List.Item as='a'>How To Access</List.Item>
//                 <List.Item as='a'>Favorite X-Men</List.Item>
//               </List>
//             </Grid.Column>
//             <Grid.Column width={7}>
//               <Header as='h4' inverted>
//                 Footer Header
//               </Header>
//               <p>
//                 Extra space for a call to action inside the footer that could help re-engage users.
//               </p>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//       </Container>
//     </Segment>
//   </div >
// )

// export default Education