import Head from 'next/head'
import { Bell, Settings, LogOut, RefreshCw, Send, Plus } from 'react-feather';
import Api from './api';
import { useEffect, useState } from 'react';
import '../styles/globals.scss';


export default function Home() {

	const [list, setList] = useState([])

	const getList = async () => {
		try {
			const response = await Api.fetchList()
			console.log('rest', response)
			setList(response.data.results)


		} catch (err) {
			console.log('err', err)
		}

	}
	useEffect(() => {
		getList();
	}, [])

	return (
		<div>
			<Head>
				<title>KIRATECH Assignment</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossOrigin="anonymous" />
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossOrigin="anonymous"></script>
				<script src="https://unpkg.com/feather-icons"></script>
			</Head>

			<main className='pb-5'>
				<div className='container px-5'>

					<div className='d-flex justify-content-between align-items-centre py-4 px-3'>

						<img src="/images/kiratech.png" className='img-fluid ' width={180} height={100} alt="" />
						<div className='d-flex align-items-centre'>
							<Bell className='me-4 mt-5' />

							<Settings className='me-4 mt-5' />

							<LogOut className='me-4 mt-5' />

						</div>

					</div>
				</div>

				<section className='section-1 mb-5 position-relative mt-4 '>
					<div className='bg-info banner'></div>
					<div className='container px-5'>
						<div className='d-flex align-items-center'>
							<img src="/images/Avatar.png" className='img-fluid me-4' width={180} alt="" />
							<div className=' text-white me-4'>
								<h2>John Doe</h2>
								<p>Last Online: 2 Days ago</p>
							</div>
							<button type="button" className='btn1 default btn-info1 p-3 me-4'><small><Send width={18} /></small> &nbsp;Send Message</button>
							<button type="button" className=' btn2 info1 bg-info1 p-3 me-4'><small><Plus width={18} /></small> &nbsp;Add friend</button>
						</div>

					</div>
				</section>

				

				<section className='section-2 container px-5 '>
					<div className='px-4 '>
						<div className='row mb-3'>
							<div className='col-2'>
								<span className='text-muted'>Date</span>
							</div>
							<div className='col-4'>
								<span className='text-muted'>Name</span>

							</div>
							<div className='col-1'>
								<span className='text-muted'>Gender</span>
							</div>
							<div className='col-2'>
								<span className='text-muted'>Country</span>

							</div>
							<div className='col-3 text-end'>
								<span className='text-muted'>Email</span>

							</div>
						</div>
					</div>

					<div >

						{list.map((item, index) => {
							let date = new Date(item.registered.date)
							const [month, day, year] = [date.toLocaleString('default', { month: 'long' }), date.getDate(), date.getFullYear()];

							return (


								<div key={index} className='card border-0 shadow-sm mb-3' data-bs-toggle="modal" data-bs-target={`#listModal${index}`}>
									<div className='card-body p-4'>
										<div className='row'>
											<div className='col-2'>
												<span className='text-muted'>{day} {month} {year}</span>
											</div>
											<div className='col-4'>
												<span>{item.name.title} {item.name.first} {item.name.last}</span>

											</div>
											<div className='col-1'>
												<span className='text-muted'>{item.gender}</span>
											</div>
											<div className='col-2'>
												<span>{item.location.country}</span>

											</div>
											<div className='col-3 text-end'>
												<span className='text-muted'>{item.email}</span>

											</div>
										</div>
									</div>

									<div className="modal fade" id={`listModal${index}`} tabindex="-1" aria-labelledby={`listModal${index}Label`} aria-hidden="true">
										<div className="modal-dialog">
											<div className="modal-content">
												<div className="modal-header border-0">
													<h2 className="modal-title" id={`listModal${index}Label`}>{item.name.title} {item.name.first} {item.name.last}</h2>
													<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div className="modal-body">
													<div className='row'>
														<div className='col-3 text-muted'>
															<p>Date:</p>
														</div>
														<div className='col-9'>
															<p>{day} {month} {year}</p>
														</div>
														<div className='col-3 text-muted'>
															<p>Gender:</p>
														</div>
														<div className='col-9'>
															<p>{item.gender}</p>
														</div>
														<div className='col-3 text-muted'>
															<p>Country:</p>
														</div>
														<div className='col-9'>
															<p>{item.location.country}</p>
														</div>
														<div className='col-3 text-muted'>
															<p>Email:</p>
														</div>
														<div className='col-9'>
															<p>{item.email}</p>
														</div>

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)


						})}

					</div>



				</section>

				<section >
					<div className='text-center mb-5' >
						<button type="button" className='btn btn-info text-white' onClick={() => getList()}> <small><RefreshCw width={15} /></small> &nbsp;Refresh </button>
					</div>
				</section>

			</main>


		</div>
	)
}
