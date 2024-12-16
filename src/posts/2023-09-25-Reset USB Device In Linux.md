---
title: "Reset USB Device In Linux"
date: 2023-09-25T11:09:55.349Z
author: equilibriumuk
draft: false
tags:
 - github
 - linux
image:
imgAuthor:
imgAuthorURL:
excerpt: "Reset Any USB Device in Linux Using Vendor ID & Product ID"
---

<img src="/media/logos/usb.svg" alt="usb-logo" class="dark-logo" width="400px">

This idea came about as my Xbox 360 Controller does not work on Archlinux without re-plugging the device after booting the system.

I wanted a way to reset the device in linux cli to save physically unplugging the device.<br />
I found a C example from 2008 on linux-usb mailing list which required a few steps & had a few drawbacks.

In the end I used libusb to implement the same reset function using vendorid & productid.

::: tip
This can also be useful for resetting a usb device after updating the firmware.
:::

## Basic Example (usbfs)

<i class="fa fa-link"></i> <a href="https://marc.info/?l=linux-usb&m=121459435621262" target="_blank" rel="noopener noreferrer">Fri, 27 Jun 2008 - linux-usb - Re: re-enumerating the device</a>

To use this example you need to:

- run `lsusb` (read device bus id & device id)
- use the above for path of device (`/dev/bus/usb/<bus id>/<device id>`)
- run command using the path above

```sh
$ lsusb
Bus 001 Device 006: ID 045e:028e Microsoft Corp. Xbox360 Controller
```

```sh
$ sudo ./usbreset /dev/bus/usb/001/006
```

::: info
This example uses the bus id which ties to the usb port the device is plugged into.
:::

I wanted to use the `vendor id` + `product id` to make it easier & also to eliminate the problem of being tied to a specific usb port.

## Using libusb

`libusb` allows connecting to usb devices using `vendor id` & `product id`.

<i class="fa fa-link"></i> <a href="https://libusb.sourceforge.io/api-1.0/group__libusb__dev.html" target="_blank" rel="noopener noreferrer">libusb: Device handling and enumeration</a>

### Test App

`libusb_open_device_with_vid_pid()` is good for creating a test app.

```c
    libusb_init(NULL);
    libusb_device_handle *handle = libusb_open_device_with_vid_pid(NULL, vid, pid);
    result = libusb_reset_device(handle);
```

> <code>libusb_open_device_with_vid_pid()</code><br/>
> This function is intended for those scenarios where you are using libusb to knock up a quick test application

### Final Implementation

Use `libusb_get_device_list()` to check the device exists in the system before calling `libusb_open()` to open the connection.

> <code>libusb_get_device_list()</code><br/>
> Returns a list of USB devices currently attached to the system.<br/>
> This is your entry point into finding a USB device to operate.

> <code>libusb_open()</code><br/>
> Open a device and obtain a device handle.<br/>
> This is a non-blocking function; no requests are sent over the bus.

- [x] Get USB Device List
- [x] Iterate Over List Checking For Matching `venid` & `devid`
- [x] Open Handle On Match

```c
    int deviceCount = libusb_get_device_list(context, &device_list);

    int i;
    for (i = 0; i < deviceCount; i++)
    {
        struct libusb_device *device = device_list[i];
        struct libusb_device_descriptor desc;
        libusb_get_device_descriptor(device, &desc);
        if (desc.idVendor == venid && desc.idProduct == devid)
        {
            libusb_open(device, &handle);
            break;
        }
    }
```

If no handle is opened give cli feedback to user.

```c
    if (handle == NULL)
    {
        fprintf(stderr, "ERROR: USB device not found [%04x:%04x]\n", vid, pid);
        return 1;
    }
```

## Adding CLI Arguments

To make the tool usable for any device I added arguments for `vendor id` & `product id`.

```c
    if (argc != 3)
    {
        printf("USB Device Reset\n");
        printf("----------------\n\n");
        printf("No input given or input invalid\n\n");
        printf("Usage: %s <vid> <pid>\n", argv[0]);
        return 1;
    }

    int vid, pid;
    sscanf(argv[1], "%04x", &vid);
    sscanf(argv[2], "%04x", &pid);
```

## Final CLI App

The final implementation has error handling, cli feedback & takes in cli arguments to allow it to be used for different devices.<br/>
It also requires root access due to connecting over usb.

- [x] Take `vid` & `pid` arguments
- [x] Check USB device is connected
- [x] Open handle
- [x] Reset USB device
- [x] Close handle

### Example

Here is an example output for Microsoft Xbox360 Controller reset.

```sh
$ sudo usbreset 045e 028e
Checking USB Device Connected ...
Resetting USB Device [045e:028e]
USB Device reset [045e:028e]
```

## Source Code

The source for this project is available on github.

<a class="github" href="https://github.com/equk/usbreset" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> usbreset</a>

## Related

📝 <a href="/2016/01/23/blackwidow-macro-keys-in-linux/" target="_blank" rel="noopener noreferrer">January 23, 2016 - BlackWidow Macro Keys In Linux (libusb)</a>

## Xbox 360 Controller Info

On Archlinux startup the controller blinks all 4 LEDs & does not work.<br/>
An example can be seen on the external site below (Slow Blink).

<i class="fa fa-link"></i> <a href="https://www.partsnotincluded.com/xbox-360-controller-led-animations-info/" target="_blank" rel="noopener noreferrer">Xbox 360 Controller LED Animations Information - Parts Not Included</a>

On resetting the controller LED1 blinks 3 times, then stays illuminated.<br/>
The controller then works as exprected.

Not sure if this is a bug with `xpad` or something with the kernel.