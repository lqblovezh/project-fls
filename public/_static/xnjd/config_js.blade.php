window.config = {};
var restUrl_publish = ''
var build_time = "Fri Mar 08 2019 17:28:23 GMT+0800 (GMT+08:00)"
var restUrl_system = "{{config('app.url','')}}"		// /system/*
var restUrl_common = "{{config('current_publisher.base_url')}}"	 // /common/*
var restUrl = "{{config('current_application.base_url', '/common')}}" // /*