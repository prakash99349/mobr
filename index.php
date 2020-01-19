<?php
$ip=get_client_ip();
$query = @unserialize(file_get_contents('http://ip-api.com/php/'.$ip));



function get_client_ip() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

?>
<!DOCTYPE html>
<html style="" class=" js flexbox canvas canvastext webgl no-touch geolocation postmessage no-websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients no-cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths" lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <!-- Basic Page Needs
    ================================================== -->
    <meta charset="utf-8">
    <!--[if IE]><meta http-equiv="x-ua-compatible" content="IE=9" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Flowers Delivery Service</title>
    <meta name="description" content="Kutriyaaaa">
    <meta name="keywords" content="agriculture, florist, flowers, garden, gardener, grass, irrigation, landscape, landscaper, landscaping, lawn, lawn services, mowing">
    <meta name="author" content="rometheme.net"> 
        <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> -->


	
	<!-- ==============================================
	Favicons
	=============================================== -->
	<!-- <link rel="shortcut icon" href="https://cutlex.com/flowers/images/favicon.ico"> -->
	<!-- <link rel="apple-touch-icon" href="https://cutlex.com/flowers/images/apple-touch-icon.png"> -->
	<!-- <link rel="apple-touch-icon" sizes="72x72" href="https://cutlex.com/flowers/images/apple-touch-icon-72x72.png"> -->
	<!-- <link rel="apple-touch-icon" sizes="114x114" href="https://cutlex.com/flowers/images/apple-touch-icon-114x114.png"> -->
	
	<!-- ==============================================
	CSS VENDOR
	=============================================== -->
	<link rel="stylesheet" type="text/css" href="images/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="images/fontawesome.css">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="images/owl_002.css">
	<link rel="stylesheet" type="text/css" href="images/owl.css">
	<link rel="stylesheet" type="text/css" href="images/magnific-popup.css">
	<link rel="stylesheet" type="text/css" href="images/animate.css">
	
	<!-- ==============================================
	Custom Stylesheet
	=============================================== -->
	<link rel="stylesheet" type="text/css" href="images/style.css">
	
    <script src="images/modernizr.js"></script>
    <style>
    	@media only screen and (max-width: 1200px) and (min-width: 600px){
    		
    	}
    	@media only screen and (max-width: 600px) and (min-width: 400px){
    		#slider{
    			display: none;
    		}
    		#p-responsive{
    			font-size: 30px !important;
    		}
    		.caption-heading{
    			font-size: 35px !important;
    		}


    	}
    	@media only screen and (max-width: 400px) and (min-width: 200px){
    		#slider{
    			display: none;
    		}
    		#p-responsive{
    			font-size: 25px !important;
    		}
    		.caption-heading{
    			font-size: 30px !important;
    		}
    		.caption-supheading{
    			font-size: 17px !important;
    		}

    	}
    </style>

</head>

<body>

	<!-- LOAD PAGE -->
	<div class="animationload" style="display: none;">
		<div class="loader" style="display: none;"></div>
	</div>
	
	<!-- BACK TO TOP SECTION -->
	<a href="#0" class="cd-top">Top</a>

	<!-- HEADER -->
    <div class="header header-1">

    	<!-- TOPBAR -->


		<!-- NAVBAR SECTION -->
		<div class="navbar-main">
			<div class="container">
			    <nav id="navbar-example" class="navbar navbar-expand-lg">
			        <a class="navbar-brand" href="/">
						<img src="images/logo.png" alt="" style="width: 120px;">
					</a>
			        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
			            <span class="navbar-toggler-icon"></span>
			        </button>
			        <div class="collapse navbar-collapse" id="navbarNavDropdown">
			            
			            <a href="tel:+17862570344" class="btn btn-primary btn-nav ml-auto" style="z-index: 3;">Call Us (786) 257-0344</a>
			        </div>
			    </nav>
		     	<!-- End Navbar -->
			</div>
		</div>

    </div>

	<!-- BANNER -->
	<div class="section" style="    padding: 20px 0px;">
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-12 col-lg-6">
					<div class="container" style="padding: 15px 0px; color: #113245;">
						<h1 class="caption-heading" style="    font-size: 35px;
">Flower Delivery Service In <?php echo $query['city']?></h1>
						<p class="caption-supheading" style="font-weight: 700; font-size: 20px; color: #8bad21;">Call Us To Know More About Our Sevice </p>
						
						<p style="    text-align: justify;">Send Flower online to your love one, We have large collection of flowers for every single ocations. Call us to book your service.</p>
	    				<p id="p-responsive" style="font-weight: 900;
    font-size: 40px;"><a href="tel:+17862570344" style="    color: #8bad21;">Call Us: (786) 257-0344</a></p>
    <p style="text-transform: uppercase;font-weight: 700;
    font-size: 20px;color: #113245;">Trusted Local Business</p>
    <img class="img-responsive" src="images/stars.webp">
    <p style="color: grey;
    font-size: small;
    text-transform: uppercase;">Trust Score 9.6 | 350 Reviews</p>
	    			</div>
				</div>
				<div class="col-lg-6">
					<img id="slider" class="img-responsive" src="images/bouqs-app-clone-banner.png" style="    height: 489px;
    margin-top: -18px;">
				</div>
			</div>
		</div>
	</div>
    		

	<!-- WHY CHOOSE US? -->
	<div class="section">
		<div class="content-wrap">
			<div class="container">

				<div class="row">

					<div class="col-sm-12 col-md-12">
						<h2 class="text-center" style="color: #113245;">
							Why Choose Us?
						</h2>
						<p class="subheading text-center mb-5">We have a large collection of flowers for different occations.</p>
					</div>
					
				</div>
				
				<div class="row">
					<!-- Item 1 -->
					<div class="col-sm-12 col-md-6 col-lg-3 mb-4">
						<div class="box-icon-1 text-center">
							<div class="icon">
								<i class="fa fa-globe"></i>
							</div>
							<div class="body-content">
								<h4>Best Local Service</h4>
								<p>We deal in multiple type of flowers all is very good quality.</p>
							</div>
						</div>
					</div>
					<!-- Item 2 -->
					<div class="col-sm-12 col-md-6 col-lg-3 mb-4">
						<div class="box-icon-1 text-center">
							<div class="icon">
								<i class="fa fa-certificate"></i>
							</div>
							<div class="body-content">
								<h4>Certified Expert</h4>
								<p>Most of our teams members are studied their course in agriculture and they are expert.</p>
							</div>
						</div>
					</div>
					<!-- Item 3 -->
					<div class="col-sm-12 col-md-6 col-lg-3 mb-4">
						<div class="box-icon-1 text-center">
							<div class="icon">
								<i class="fa fa-thumbs-up"></i>
							</div>
							<div class="body-content">
								<h4>Affordabel Pricing</h4>
								<p>Our price ranges are fit with everyone pockets. We only chage for the service we give you.</p>
							</div>
						</div>
					</div>
					<!-- Item 4 -->
					<div class="col-sm-12 col-md-6 col-lg-3 mb-4">
						<div class="box-icon-1 text-center">
							<div class="icon">
								<i class="fa fa-star"></i>
							</div>
							<div class="body-content">
								<h4>High Quality Services</h4>
								<p>One of our team member come to your home and plant flowers with our expert techniques.</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

	<!-- CTA -->
	<div class="section bgi-cover-center" data-background="images/dummy-img-1920x900-3.jpg" style="background-image: url(images/dummy-img-1920x900-3.jpg);">
		<div class="content-wrap py-0">
			<div class="container">
				<div class="row align-items-end">
					
					<div class="col-sm-12 col-md-12 col-lg-7">
						
						<div class="text-white mt-5">
							<h1 class="section-heading no-after text-primary" style="color: black !important;
    text-shadow: 2px 0px 2px white;">
								Planning to gift flowers to Your loved One?
							</h1>
							<p class="mb-5" style="color: black;
    text-shadow: 1px 0px 8px wheat;">Call us on the provided number and book your flower package today! We are trusted that serve flowers online.</p>

						</div>
						<a href="tel:+17862570344" class="btn btn-primary">Call Now (786) 257-0344</a>	
						<div class="spacer-content"></div>
					</div>

					<div class="col-sm-12 col-md-12 col-lg-5">
						<div class="img-cta">
							<img src="images/wedding-couple.png" alt="" class="img-fluid">
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

	<!-- WHY CHOOSE -->
	<div class="section">
		<div class="content-wrap">
			<div class="container">

				<div class="row">

					<div class="col-sm-12 col-md-12">
						<h2 class="text-center" style="color: #113245;">
							How We Work
						</h2>
						<p class="subheading text-center mb-5">Schedule Our service In 3 Easy Steps.</p>
					</div>
					
				</div>
				
				<div class="row">
					<!-- Item 1 -->
					<div class="col-sm-12 col-md-12 col-lg-4 mb-4">
						<div class="box-image-1">
							<i class="fa fa-phone" aria-hidden="true" style="font-size: 60px;
    background: #8bad21;
    color: white;
    padding: 20px 28px;
    border-radius: 50px;"></i>
							<div class="body-content">
								<h4>Step 1: Call Us</h4>
								<p>Call to our expert and fell free to know about our services.</p>
							</div>
						</div>
					</div>
					<!-- Item 2 -->
					<div class="col-sm-12 col-md-12 col-lg-4 mb-4">
						<div class="box-image-1">
							<i class="fa fa-calendar" aria-hidden="true" style="font-size: 51px;
    background: #8bad21;
    color: white;
    padding: 25px 27px;
    border-radius: 50px;"></i>

							<div class="body-content">
								<h4>Step 2: Book Your Flowers</h4>
								<p>Book flowers as per your requirement, We have fresh flowers</p>
							</div>
						</div>
					</div>
					<!-- Item 3 -->
					<div class="col-sm-12 col-md-12 col-lg-4 mb-4">
						<div class="box-image-1">
							<i class="fa fa-home" aria-hidden="true" style="font-size: 51px;
    background: #8bad21;
    color: white;
    padding: 25px 27px;
    border-radius: 50px;"></i>

							<div class="body-content">
								<h4>Step 3: Receive At Doorstep</h4>
								<p>After receive your booking we ensure that we delivered it within 1 day.</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

	

	<!-- OUR PARTNERS -->
	<div class="section bg-gray-light">
		<div class="content-wrap py-5">
			<div class="container">
				
				<div class="row gutter-5">
					<div class="col-6 col-md-4 col-lg-2">
						<a href="#"><img src="images/client1.png" alt="" class="img-fluid img-border"></a>
					</div>
					<div class="col-6 col-md-4 col-lg-2">
						<a href="#"><img src="images/client2.png" alt="" class="img-fluid img-border"></a>
					</div>
					<div class="col-6 col-md-4 col-lg-2">
						<a href="#"><img src="images/client3.png" alt="" class="img-fluid img-border"></a>
					</div>
					<div class="col-6 col-md-4 col-lg-2">
						<a href="#"><img src="images/client4.png" alt="" class="img-fluid img-border"></a>
					</div>
					<div class="col-6 col-md-4 col-lg-2">
						<a href="#"><img src="images/client5.png" alt="" class="img-fluid img-border"></a>
					</div>
					<div class="col-6 col-md-4 col-lg-2">
						<a href="#"><img src="images/client6.png" alt="" class="img-fluid img-border"></a>
					</div>

				</div>
			</div>
		</div>
	</div>

	<!-- FOOTER SECTION -->
	<div class="footer">
		<div class="content-wrap pb-0">
			<div class="container">
				
				<div class="row">
					<div class="col-sm-6 col-md-6 col-lg-3">
						<div class="footer-item">
							<a href="/">
								<img src="images/logo_w.png" alt="logo bottom" class="logo-bottom" style="width: 120px;">
							</a>
							
							<div class="spacer-30"></div>
							<p>Getting into the flower industry or flower business is easy, 
but the survival is the toughest. In the present internet dominated 
scenario, to make your flower boutique successful, you need to make a 
great online presence...</p>
							<!-- <div class="sosmed-icon icon-bg-primary d-inline-flex">
								<a href="#"><i class="fa fa-facebook"></i></a> 
								<a href="#"><i class="fa fa-twitter"></i></a> 
								<a href="#"><i class="fa fa-instagram"></i></a> 
								<a href="#"><i class="fa fa-pinterest"></i></a> 
								<a href="#"><i class="fa fa-linkedin"></i></a> 
							</div> -->
						</div>
					</div>					

					<div class="col-sm-6 col-md-6 col-lg-3">
						<div class="footer-item">
							<div class="footer-title">
								Contact Info
							</div>
							
							<div class="row mb-3">
								<div class="col-5">Address :</div>
								<div class="col-7">99 Park Jomblo Street, Panam, Pekanbaru 28292, Riau</div>
							</div>
							<div class="row mb-3">
								<div class="col-5">Phone  :</div>
								<div class="col-7">(786) 257-0344</div>
							</div>
							<!-- <div class="row mb-3">
								<div class="col-5">Fax :</div>
								<div class="col-7">(123) 65412309</div>
							</div> -->
							<div class="row mb-3">
								<div class="col-5">Email :</div>
								<div class="col-7">info@brosflorish.com</div>
							</div>

						</div>
					</div>

					<div class="col-sm-6 col-md-6 col-lg-3">
						<div class="footer-item">
							<div class="footer-title">
								Opening Hours
							</div>
							
							<div class="row mb-3">
								<div class="col-5">Mon - Fri :</div>
								<div class="col-7">07 AM - 04 PM</div>
							</div>
							<div class="row mb-3">
								<div class="col-5">Saturday :</div>
								<div class="col-7">07 AM - 12 AM</div>
							</div>
							<!-- <div class="row mb-3">
								<div class="col-5">Friday :</div>
								<div class="col-7">Closed</div>
							</div> -->
								
						</div>
					</div>
					
					<div class="col-sm-6 col-md-6 col-lg-3">
						<img src="images/complex-img.png" alt="" class="img-fluid">
					</div>
				</div>
			</div>
		</div>
		
		<div class="fcopy">
			<div class="container">
				<div class="row">
					<div class="col-sm-12 col-md-12">
						<p class="ftex">Copyright © 2019</p> 
					</div>
				</div>
			</div>
		</div>
		
	</div>
	
	<!-- JS VENDOR -->
	<script src="images/jquery_002.js"></script>
	<script src="images/bootstrap.js"></script>
	<script src="images/owl.js"></script>
	<script src="images/jquery.js"></script>

	<!-- SENDMAIL -->
	<script src="images/validator.js"></script>
	<script src="images/form-scripts.js"></script>

	<script src="images/script.js"></script>


</body></html>